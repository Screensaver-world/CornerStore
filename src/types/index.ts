export enum Currency {
  ETH = 'ETH',
  RARI = 'RARI',
}

export type BidItem = {
  createdAt: Date;
  createdByName: string;
  createdByImageUrl: string;
  price: string;
  currency: Currency;
  quantity: number;
};

export type NFTOwner = {
  avatarUrl: string;
  name: string;
  quantity: number;
  price: string;
  currency: Currency;
};
