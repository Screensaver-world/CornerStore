import React, { useCallback } from 'react';
import HorizontalCard from 'components/HorizontalCard';
import Button from 'components/Button';
import { NFTOwner } from 'types';

type Props = {
  data: NFTOwner;
  total: number;
};

function OwnerCard({ data, total }: Props) {
  const { name, avatarUrl, quantity, price, currency } = data;
  return (
    <HorizontalCard
      imageUrl={avatarUrl}
      title={name}
      subtitle={
        <span>
          {quantity}/{total} on sale for{' '}
          <span className={'font-bold text-white'}>
            {price} {currency}
          </span>
        </span>
      }
      actions={
        <div>
          <Button title={'Buy'} />
        </div>
      }
    />
  );
}

export default OwnerCard;
