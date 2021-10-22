import { NftItemMeta } from 'api/raribleRequestTypes';

export const getImage = (meta: NftItemMeta, reverseOrder = false) => {
  if (!meta?.image) {
    return null;
  }
  const { url } = meta?.image ?? {};
  //TODO: improve xd
  const img = reverseOrder ? url?.PREVIEW ?? url?.ORIGINAL ?? url?.BIG : url?.BIG ?? url?.ORIGINAL ?? url?.PREVIEW;
  return img?.startsWith('ipfs') ? img.replace('ipfs://', 'https://ipfs.io/') : img;
};

export const shortAddress = (address: string, before: number, after: number): string =>
  address ? `${address.slice(0, before)}...${address.slice(address.length - after, address.length)}` : '';
