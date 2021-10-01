import React, { useCallback } from 'react';
import HorizontalCard from 'components/HorizontalCard';
import Button from 'components/Button';
import { NFTOwner } from 'types';

type Props = {
  data: NFTOwner;
  total: number;
};

function OwnerCard({ data, total }: Props) {
  const { quantity, price, currency } = data;

  const renderSubtitle = useCallback(() => {
    return (
      <div>
        {quantity}/{total} on sale for{' '}
        <span className={'font-bold'}>
          {price} {currency}
        </span>
      </div>
    );
  }, []);
  return (
    <HorizontalCard
      imageUrl={data.avatarUrl}
      title={data.name}
      subtitle={renderSubtitle()}
      actions={
        <div>
          <Button title={'Buy'} />
        </div>
      }
    />
  );
}

export default OwnerCard;
