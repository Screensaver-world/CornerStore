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
        <div>
          Listed {quantity} edition for{' '}
          <span className={'font-bold'}>
            {price} {currency}
          </span>
        </div>
      }
      subtitle={
        <div>
          By <span className={'font-bold'}>{createdBy.name}</span> {formatDate(createdAt)}
        </div>
      }
    />
  );
}

export default HistoryCard;
