import React from 'react';
import HorizontalCard from 'components/HorizontalCard';
import { formatDate } from 'utils/dateTimeUtils';
import makeBlockie from 'ethereum-blockies-base64';
import { shortAddress } from 'utils/itemUtils';

function generateBody(actionName, content = '') {
  return (
    <span className={'text-gray-700'}>
      {actionName} <span className={'text-white font-bold'}>{content ?? ''}</span>
    </span>
  );
}

function getCardBody(data) {
  switch (data['@type']) {
    case 'list':
      return generateBody('Listed for', `${data.price} ${data.take.assetType.assetClass}`);
    case 'mint':
      return generateBody('Minted');
    case 'match':
      return generateBody('Purchased for', `${data.price} ${data.take.assetType.assetClass}`);
  }
}

type Props = {
  //TODO types fix
  data: any;
};

// todo handle all cases
// todo handle 5 minutes ago for recent transactions..
function HistoryCard({ data }: Props) {
  console.log(data);
  const address = data['@type'] === 'match' ? data.taker : data.maker;
  return (
    <HorizontalCard
      imageUrl={makeBlockie(address ?? '0x000')}
      title={getCardBody(data)}
      subtitle={`By ${shortAddress(address, 6, 5)} ${formatDate(new Date(Date.parse(data.date)))}`}
    />
  );
}

export default HistoryCard;
