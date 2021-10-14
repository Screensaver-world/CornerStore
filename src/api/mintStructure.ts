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
    Mint1155: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'supply', type: 'uint256' },
      { name: 'uri', type: 'string' },
      { name: 'creators', type: 'Part[]' },
      { name: 'royalties', type: 'Part[]' },
    ],
    Part: [
      { name: 'account', type: 'address' },
      { name: 'value', type: 'uint96' },
    ],
  },
  domain: {
    name: 'Mint1155',
    version: '1',
    chainId: NETWORK_ID,
    verifyingContract: CONTRACT_ID,
  },
  primaryType: 'Mint1155',
};

export function getMintStructure(message: LazyMintRequestBodyForSignature): {
  types: unknown;
  primaryType: string;
  domain: unknown;
  message: LazyMintRequestBodyForSignature;
} {
  return { ...mintData, message };
}
