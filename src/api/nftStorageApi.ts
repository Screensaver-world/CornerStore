import { NFT_STORAGE_API_KEY } from 'utils/constants';

export async function store(body) {
  return (
    await fetch('https://api.nft.storage/upload', {
      method: 'post',
      headers: { Authorization: `Bearer ${NFT_STORAGE_API_KEY}` },
      body: body,
    })
  ).json();
}
