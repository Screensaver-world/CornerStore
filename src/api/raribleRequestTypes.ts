export type GetNftItemsRequest = {
  continuation?: string;
  size?: number;
  showDeleted?: boolean;
  lastUpdatedFrom?: number;
  lastUpdatedTo?: number;
  includeMeta?: boolean;
  type?: NftItemsRequestType;
};

export enum NftItemsRequestType {
  ALL = 'all',
  BY_CREATOR = 'byCreator',
  BY_OWNER = 'byOwner',
}

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
