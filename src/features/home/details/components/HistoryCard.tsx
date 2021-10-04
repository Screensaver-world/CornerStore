import React from 'react';
import HorizontalCard from 'components/HorizontalCard';
import { NFTTransaction } from 'types';
import { formatDate } from 'utils/dateTimeUtils';

type Props = {
  data: NFTTransaction;
};

// todo handle all cases
// todo handle 5 minutes ago for recent transactions..
function HistoryCard({ data }: Props) {
  const { createdBy, createdAt, quantity, price, currency } = data;
  return (
    <HorizontalCard
      imageUrl={createdBy.avatarUrl}
      title={
        <span className={'text-gray-700'}>
          Listed {quantity} edition for{' '}
          <span className={'text-white font-bold'}>
            {price} {currency}
          </span>
        </span>
      }
      subtitle={`By ${createdBy.name} ${formatDate(createdAt)}`}
    />
  );
}

export default HistoryCard;
