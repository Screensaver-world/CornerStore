import { useQuery } from 'react-query';
import { BidItem, Currency, NFTItemOrder, NFTOwner } from '../types';
import { QueryTypes } from './queryTypes';
import { GetNftItemsRequest, GetNftItemsResponse, NftItemsRequestType } from './raribleRequestTypes';

const BASE_URL = 'https://ethereum-api.rarible.org';

export function useGetNftItemOrderActivity() {
  return useQuery<NFTItemOrder[]>('nft-item-order-activity', () => {
    return mockWithTimeout<NFTItemOrder[]>([
      {
        '@type': 'transfer',
        createdAt: new Date(),
        price: '10,02',
        currency: Currency.ETH,
        createdBy: {
          name: 'mladibejn',
          avatarUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
        },
        quantity: 2,
      },
      {
        '@type': 'mint',
        createdAt: new Date(),
        price: '10,02',
        currency: Currency.ETH,
        createdBy: {
          name: 'mladibejn2',
          avatarUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
        },
        quantity: 2,
      },
    ]);
  });
}

export function useGetNftBids() {
  return useQuery<BidItem[]>('nft-item-bids', () => {
    return mockWithTimeout<BidItem[]>([
      {
        createdAt: new Date(),
        createdByName: 'Lupus7',
        createdByImageUrl: 'https://avatars.githubusercontent.com/u/51007736?v=4',
        price: '0.01',
        quantity: 1,
        currency: Currency.RARI,
      },
      {
        createdAt: new Date(),
        createdByName: 'mladibejn',
        createdByImageUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
        price: '1.01',
        quantity: 3,
        currency: Currency.RARI,
      },
    ]);
  });
}

export function useGetNFTItemOwnerships() {
  return useQuery<NFTOwner[]>('nft-item-owners', () => {
    return mockWithTimeout<NFTOwner[]>([
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
        price: '10,02',
        currency: Currency.ETH,
        name: 'mladibejn',
        quantity: 2,
      },
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
        price: '10,02',
        currency: Currency.ETH,
        name: 'mladibejn',
        quantity: 2,
      },
    ]);
  });
}

const mockWithTimeout = <T>(data: T) =>
  new Promise<T>((res) => {
    setTimeout(() => {
      res(data);
    }, 1000);
  });

export function useGetNftItems(searchParams: GetNftItemsRequest = {}) {
  return useQuery<GetNftItemsResponse>([QueryTypes.NFT_ITEMS, searchParams], async () => getNftItems(searchParams), {
    enabled: false,
  });
}

export async function getNftItems(searchParams: GetNftItemsRequest = {}) {
  const query = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');
  return (await fetch(`${BASE_URL}/v0.1/nft/items/${searchParams.type ?? NftItemsRequestType.ALL}?${query}`)).json();
}
