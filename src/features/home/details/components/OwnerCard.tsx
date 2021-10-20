import React, { useCallback } from 'react';
import HorizontalCard from 'components/HorizontalCard';
import Button from 'components/Button';
import { NFTOwner } from 'types';
import makeBlockie from 'ethereum-blockies-base64';
import { shortAddress } from 'utils/itemUtils';

type Props = {
  owner: string;
  sellOrder?: any;
};

function OwnerCard({ owner, sellOrder }: Props) {
  console.log(sellOrder);
  return (
    <HorizontalCard
      imageUrl={makeBlockie(owner ?? '0x000')}
      title={shortAddress(owner, 6, 8)}
      subtitle={
        sellOrder ? (
          <span>
            On sale for{' '}
            <span className={'font-bold text-white'}>
              {sellOrder.take.valueDecimal} {sellOrder.take.assetType.assetClass}
            </span>
          </span>
        ) : (
          'Not for sale'
        )
      }
      actions={<div>{sellOrder && <Button title={'Buy'} />} </div>}
    />
  );
}

export default OwnerCard;
