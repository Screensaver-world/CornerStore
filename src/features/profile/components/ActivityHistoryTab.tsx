import React, { useCallback, useEffect, useState } from 'react';
import { ProductList } from 'components/ProductCard';
import { getActivityHistory, useGetNftItems } from 'api/raribleApi';
import { ActivityHistoryFilter } from 'api/raribleRequestTypes';
import { useWallet } from 'wallet/state';
import ActivityCard from 'components/ActivityCard/ActivityCard';
import Button, { ButtonType } from 'components/Button';
import { ReloadIcon } from 'assets';

export interface Props {
  address: string;
}

const ActivityHistoryTab: React.FunctionComponent<Props> = ({ address }) => {
  const [items, setItems] = useState<any[]>([]);
  const [continuation, setContinuation] = useState<string>(undefined);

  const fetchData = useCallback(async () => {
    const newItems = await getActivityHistory({
      address,
      filterBy: ActivityHistoryFilter.BY_USER,
      sort: 'EARLIEST_FIRST',
      size: 10,
      continuation,
    });

    const mappedItems = newItems.items.map((item) => {
      if (item['@type'] === 'mint') {
        return { type: 'mint', date: item.date, itemId: `${item.contract}:${item.tokenId}` };
      }
      if (item['@type'] === 'list') {
        const { contract, tokenId } = item.make.assetType;

        return {
          type: 'list',
          date: item.date,
          itemId: `${contract}:${tokenId}`,
          price: item.take.valueDecimal,
          currency: item.take.assetType.assetClass,
        };
      }
      if (item['@type'] === 'match') {
        const { contract, tokenId } = item.make.assetType;
        return {
          type: 'match',
          date: item.date,
          itemId: `${contract}:${tokenId}`,
          price: item.price,
          seller: item.left.maker,
          buyer: item.right.maker,
          currency: item.right.asset.assetType.assetClass,
        };
      }
    });
    setItems([...items, ...mappedItems]);
    setContinuation(newItems.continuation);
  }, [address, continuation]);
  useEffect(() => {
    if (address) {
      fetchData();
    }
  }, [address]);
  return (
    <div className="max-w-screen-lg px-4 py-3 mx-auto sm:px-6 lg:px-6 lg:py-6">
      {items.map((item, id) => (
        <ActivityCard key={id} item={item} address={address} />
      ))}
      {continuation && (
        <div className="flex justify-center">
          <Button
            type={ButtonType.Main}
            title="Load more"
            customClasses="px-7 py-3"
            icon={ReloadIcon}
            onClick={fetchData}
          />
        </div>
      )}
    </div>
  );
};
export default ActivityHistoryTab;
