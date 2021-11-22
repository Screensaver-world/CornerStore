import { useQuery } from 'react-query';

import { Core } from '@self.id/core';

import type { BasicProfile, AlsoKnownAsAccount } from '@ceramicstudio/idx-constants';
import { addrToCaip } from 'utils/caip10';
import { useEffect } from 'react';

// init

const core = new Core({ ceramic: 'mainnet-gateway' });

async function getDID(ethAddress: string | null): Promise<string | null> {
  return ethAddress ? core.getAccountDID(ethAddress) : null;
}

async function getProfileInfo(did: string): Promise<BasicProfile | null> {
  const basicProfileInfo = await core.get('basicProfile', did);
  return basicProfileInfo;
}

async function getSocials(did: string): Promise<AlsoKnownAsAccount[]> {
  const socials = await core.get('alsoKnownAs', did);
  return socials.accounts || [];
}

// example call
// const someEthAddress = '0xasdf';
// const basicProfileInfo = await getProfileInfo(someEthAddress);

export function useProfile(ethAddress: string | null): {
  basicProfileInfo: BasicProfile | null;
  loading: boolean;
  error: unknown;
} {
  console.log('ethAddress', ethAddress);
  console.log('caip', addrToCaip.eth(ethAddress || ''));

  const {
    data: did,
    error: didError,
    isLoading: didLoading,
    refetch: refetchDID,
  } = useQuery(['did', 'eth', ethAddress], () => (ethAddress ? getDID(addrToCaip.eth(ethAddress)) : undefined));

  useEffect(() => {
    console.log('fetch DID');
    refetchDID();
  }, [ethAddress]);

  console.log('did', did);

  const { data, isLoading, error, refetch: refetchProfile } = useQuery(['profile', did], () => getProfileInfo(did));

  useEffect(() => {
    console.log('fetch profile');
    refetchProfile();
  }, [did]);

  console.log('profile', data);
  return {
    basicProfileInfo: data,
    loading: isLoading || didLoading,
    error: error || didError,
  };
}

export function useSocials(ethAddress: string | null): {
  socials: AlsoKnownAsAccount[];
  loading: boolean;
  error: unknown;
} {
  const {
    data: did,
    error: didError,
    isLoading: didLoading,
  } = useQuery(['did', 'eth', ethAddress], () => (ethAddress ? getDID(addrToCaip.eth(ethAddress)) : undefined));

  const { data, isLoading, error } = useQuery(['socials', did], () => getSocials(did), {
    enabled: !!did && !didError && !didLoading,
  });
  return {
    socials: data,
    loading: isLoading || didLoading,
    error: error || didError,
  };
}
