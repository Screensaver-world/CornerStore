import React, { useCallback } from 'react';
import { BidItem } from 'types';
import HorizontalCard from 'components/HorizontalCard';
import { formatDate } from 'utils/dateTimeUtils';

type Props = {
  data: BidItem;
};

function BidCard({ data }: Props) {
  const { createdByImageUrl } = data;
  const createdAt = formatDate(data.createdAt);

  const renderTitle = useCallback(() => {
    return (
      <p>
        <span className={'font-bold'}>
          {data.price} {data.currency}
        </span>{' '}
        by <span className={'font-bold'}>{data.createdByName}</span> for {data.quantity} edition
      </p>
    );
  }, [data]);

  return <HorizontalCard imageUrl={createdByImageUrl} title={renderTitle()} subtitle={createdAt} />;
}

export default BidCard;
