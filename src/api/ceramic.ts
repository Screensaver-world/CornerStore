import { useQuery } from 'react-query';

// The Ceramic instance for a "raw" connection to the network
import CeramicClient from '@ceramicnetwork/http-client';
// The IDX instance for getting the "basicProfile" info, including display name
import { IDX } from '@ceramicstudio/idx';
// CAIP10 look up
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';

// For resolving Decentralized Identity documents
import { DID } from 'dids';
// import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { Resolver } from 'did-resolver';

import type { AlsoKnownAs, BasicProfile, AlsoKnownAsAccount } from '@ceramicstudio/idx-constants';

const API_URL = 'https://gateway.ceramic.network';

// init

const ceramic = new CeramicClient(API_URL);
const idx = new IDX({
  autopin: false,
  ceramic,
});
// const keyDidResolver = KeyDidResolver.getResolver();
const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
const resolver = new Resolver({
  ...threeIdResolver,
  // ...keyDidResolver,
});
const didResolver = new DID({ resolver });
const didSetPromise = ceramic.setDID(didResolver);

async function getDID(ethAddress: string | null): Promise<string | null> {
  await didSetPromise;
  const caip10Info = await Caip10Link.fromAccount(ceramic, ethAddress);
  return caip10Info.did;
}

async function getProfileInfo(did: string): Promise<BasicProfile | null> {
  await didSetPromise;
  const basicProfileInfo = await idx.get<BasicProfile | null>('basicProfile', did);
  return basicProfileInfo;
}

async function getSocials(did: string): Promise<AlsoKnownAsAccount[]> {
  await didSetPromise;
  const socials = await idx.get<AlsoKnownAs>('alsoKnownAs', did);
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
  const {
    data: did,
    error: didError,
    isLoading: didLoading,
  } = useQuery(['did', ethAddress], () => getDID(ethAddress), {
    enabled: !!ethAddress,
  });

  const { data, isLoading, error } = useQuery(['profile', did], () => getProfileInfo(did), {
    enabled: !!did && !didError && !didLoading,
  });
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
  } = useQuery(['did', ethAddress], () => getDID(ethAddress), {
    enabled: !!ethAddress,
  });

  const { data, isLoading, error } = useQuery(['socials', did], () => getSocials(did), {
    enabled: !!did && !didError && !didLoading,
  });
  return {
    socials: data,
    loading: isLoading || didLoading,
    error: error || didError,
  };
}
