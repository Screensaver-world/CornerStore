import React from 'react';
import OwnerCard from './OwnerCard';

type Props = {
  owners: any[];
  sellOrders: any[];
};

function OwnersTab({ owners, sellOrders }: Props) {
  return (
    <>
      {owners.map((d, index) => (
        <OwnerCard key={index} owner={d} sellOrder={sellOrders.find((order) => order?.maker === d)} />
      ))}
    </>
  );
}

export default OwnersTab;
