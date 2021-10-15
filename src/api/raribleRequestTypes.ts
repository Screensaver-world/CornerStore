export type GetNftItemsRequest = {
  continuation?: string;
  size?: number;
  showDeleted?: boolean;
  lastUpdatedFrom?: number;
  lastUpdatedTo?: number;
  includeMeta?: boolean;
  type?: NftItemsRequestType;
  //used when fetching byCreator/byOwner
  address?: string;
};

export enum NftItemsRequestType {
  ALL = 'all',
  BY_CREATOR = 'byCreator',
  BY_OWNER = 'byOwner',
  BY_COLLECTION = 'byCollection',
}

export enum OrderFilter {
  ALL = 'all',
  BY_MAKER = 'byMaker',
  BY_ITEM = 'byItem',
}

export enum OrderRequestTypes {
  ALL = 'all',
  SELL = 'sell',
  BIDS = 'bids',
}

export type GetOrdersRequest = {
  continuation?: string;
  size?: number;
  origin?: number;
  // maker/item
  address?: string;
  type?: OrderRequestTypes;
  filerBy?: OrderFilter;
};

export type GetOrdersResponse = {
  continuation?: string;
  orders?: NftOrder[];
};

export type NftOrder = {
  id: string;
  contract: string;
  tokenId: string;
  creators: { account: string; value: number }[];
  supply: number;
  lazySupply: number;
  owners: string[];
  royalties: { account: string; value: number }[];
  date?: string;
  pending?: { type: 'TRANSFER'; from: string };
  delete?: boolean;
  meta?: NftItemMeta;
};

export type GenerateNftTokenIdRequest = {
  collection: string;
  minter: string;
};

export type GetNftItemsResponse = {
  continuation?: string;
  total: number;
  items?: NtfItem[];
};

export type NtfItem = {
  id: string;
  contract: string;
  tokenId: string;
  creators: { account: string; value: number }[];
  supply: number;
  lazySupply: number;
  owners: string[];
  royalties: { account: string; value: number }[];
  date?: string;
  pending?: { type: 'TRANSFER'; from: string };
  delete?: boolean;
  meta?: NftItemMeta;
};

export type NftItemMeta = {
  name: string;
  description?: string;
  attibutes: {
    key: string;
    value?: string;
  }[];
  image?: NftMedia;
  animation?: NftMedia;
};

//TODO check this
export type NftMedia = {
  url?: {
    BIG?: string;
    ORIGINAL?: string;
    PREVIEW?: string;
  };
};

export type LazyMintRequestBodyForSignature = {
  '@type': 'ERC721';
  contract: string;
  tokenId: string;
  uri: string;
  creators: { account: string; value: number }[];
  royalties: { account: string; value: number }[];
};

export type LazyMintRequestBody = LazyMintRequestBodyForSignature & {
  signatures: string[];
};
