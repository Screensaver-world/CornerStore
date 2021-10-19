import { useGetActivityHistory } from 'api/raribleApi';
import { ActivityHistoryFilter } from 'api/raribleRequestTypes';
import { ReloadIcon } from 'assets';
import Button, { ButtonType } from 'components/Button';
import React, { useEffect, useState } from 'react';
import { getItemsForSellOrders, mapActivityHistory } from 'utils/raribleApiUtils';
import HistoryCard from './HistoryCard';

type Props = { initialHistory?: any; address: string };

function HistoryTab({ initialHistory, address }: Props) {
  const [continuation, setContinuation] = useState(initialHistory?.continuation);
  const { isIdle, data, refetch } = useGetActivityHistory({
    address,
    filterBy: ActivityHistoryFilter.BY_ITEM,
    size: 5,
    sort: 'EARLIEST_FIRST',
    continuation,
  });

  const [items, setItems] = useState(initialHistory.items ?? []);

  useEffect(() => {
    if (isIdle && !initialHistory && items.length === 0) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (continuation === undefined || continuation !== data.continuation) {
        setItems([...items, ...mapActivityHistory(data.orders)]);
        getItemsForSellOrders(data.orders).then((newItems) => setItems([...items, ...newItems]));
        setContinuation(data.continuation);
      } else {
        setContinuation(null);
      }
    }
  }, [data]);

  return (
    <>
      {items.map((d, index) => (
        <HistoryCard key={index} data={d} />
      ))}
      {continuation && (
        <div className="flex justify-center">
          <Button
            type={ButtonType.Main}
            title="Load more"
            customClasses="px-7 py-3"
            icon={ReloadIcon}
            onClick={() => refetch}
          />
        </div>
      )}
    </>
  );
}

export default HistoryTab;
