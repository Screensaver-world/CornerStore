import { Currencies } from 'types';
import { CONTRACT_ID, NETWORK_ID } from 'utils/constants';

const orderData = {
  types: {
    EIP712Domain: [
      { type: 'string', name: 'name' },
      { type: 'string', name: 'version' },
      { type: 'uint256', name: 'chainId' },
      { type: 'address', name: 'verifyingContract' },
    ],
    AssetType: [
      { name: 'assetClass', type: 'bytes4' },
      { name: 'data', type: 'bytes' },
    ],
    Asset: [
      { name: 'assetType', type: 'AssetType' },
      { name: 'value', type: 'uint256' },
    ],
    Order: [
      { name: 'maker', type: 'address' },
      { name: 'makeAsset', type: 'Asset' },
      { name: 'taker', type: 'address' },
      { name: 'takeAsset', type: 'Asset' },
      { name: 'salt', type: 'uint256' },
      { name: 'start', type: 'uint256' },
      { name: 'end', type: 'uint256' },
      { name: 'dataType', type: 'bytes4' },
      { name: 'data', type: 'bytes' },
    ],
  },
  domain: {
    name: 'Exchange',
    version: '2',
    chainId: 4,
    verifyingContract: '0x6ede7f3c26975aad32a475e1021d8f6f39c89d82',
  },
  primaryType: 'Order',
};

export function getOrderStructure(message: EncodeOrderResponse): typeof orderData & { message: EncodeOrderResponse } {
  return { ...orderData, message };
}

export function createOrder(maker: string, tokenId: string, currency: Currencies, value: string): EncodeOrderRequest {
  return {
    type: 'RARIBLE_V2',
    maker,
    make: {
      assetType: {
        assetClass: 'ERC721',
        contract: '0xcfa14f6DC737b8f9e0fC39f05Bf3d903aC5D4575',
        tokenId,
      },
      value: '1',
    },
    take: {
      assetType: {
        assetClass: currency,
      },
      value: value,
    },
    data: {
      dataType: 'RARIBLE_V2_DATA_V1',
      payouts: [],
      originFees: [],
    },
    salt: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  };
}

export type EncodeOrderRequest = {
  type: 'RARIBLE_V2';
  maker: string;
  salt: number;
  make: {
    assetType: { assetClass: 'ERC721'; contract: string; tokenId: string };
    value: '1';
  };
  take: { assetType: { assetClass: Currencies }; value: string };
  data: {
    dataType: 'RARIBLE_V2_DATA_V1';
    payouts: { account: string; value: number }[];
    originFees: { account: string; value: number }[];
  };
};

export type EncodeOrderResponse = {
  maker: string;
  makeAsset: {
    assetType: {
      assetClass: string;
      data: string;
    };
    value: string;
  };
  taker: string;
  takeAsset: { assetType: { assetClass: string; data: string }; value: string };
  start: string;
  end: string;
  dataType: string;
  data: string;
};

export type SignedOrder = {
  signature: String;
} & EncodeOrderRequest;
