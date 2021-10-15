import { CONTRACT_ID, NETWORK_ID } from 'utils/constants';
import { LazyMintRequestBodyForSignature } from './raribleRequestTypes';

const mintData = {
  types: {
    EIP712Domain: [
      {
        type: 'string',
        name: 'name',
      },
      {
        type: 'string',
        name: 'version',
      },
      {
        type: 'uint256',
        name: 'chainId',
      },
      {
        type: 'address',
        name: 'verifyingContract',
      },
    ],
    Mint721: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'tokenURI', type: 'string' },
      { name: 'creators', type: 'Part[]' },
      { name: 'royalties', type: 'Part[]' },
    ],
    Part: [
      { name: 'account', type: 'address' },
      { name: 'value', type: 'uint96' },
    ],
  },
  domain: {
    name: 'Mint721',
    version: '1',
    chainId: 4,
    verifyingContract: '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82',
  },
  primaryType: 'Mint721',
};

export function getMintStructure(message: LazyMintRequestBodyForSignature): {
  types: unknown;
  primaryType: string;
  domain: unknown;
  message: LazyMintRequestBodyForSignature;
} {
  return { ...mintData, message };
}

export type CreateNftMetadata = {
  name: string;
  description?: string;
  //this must be prefixed with "ipfs://ipfs/{{ IPFS_HASH ))
  image?: string;
  // This is the link to Rarible
  external_url: string;
  animation_url?: string;
  //TODO there is also attributes section if we need ti
};
