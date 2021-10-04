import React from 'react';
import { useGetNFTItemOwnerships } from 'api/raribleApi';
import OwnerCard from './OwnerCard';

type Props = {
  total: number;
};

function OwnersTab({ total }: Props) {
  const { isLoading, data } = useGetNFTItemOwnerships();

  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      {data.map((d, index) => (
        <OwnerCard key={index} data={d} total={total} />
      ))}
    </>
  );
}

export default OwnersTab;
