import { useGetNftItems } from 'api/raribleApi';
import { GetNftItemsResponse, NftItemsRequestType, NtfItem } from 'api/raribleRequestTypes';
import { ReloadIcon } from 'assets';
import Button from 'components/Button';
import { ButtonType } from 'components/Button/Button';
import React, { FC, useCallback, useState, useEffect } from 'react';
import ProductCard from './ProductCard';

type Props = {
  itemsData: GetNftItemsResponse;
  hideLoadMoreButton?: boolean;
  onLoadMore?: () => void;
  viewType: NftItemsRequestType;
  userAddress?: string;
};

const ProductList: FC<Props> = ({ itemsData, hideLoadMoreButton = false, onLoadMore }) => {
  const [continuation, setContinuation] = useState(itemsData.continuation);
  const { data, refetch } = useGetNftItems({ continuation, size: 20, includeMeta: true });
  const [items, setItems] = useState<NtfItem[]>(itemsData.items);

  useEffect(() => {
    if (data) {
      setItems([...items, ...data.items]);
      setContinuation(data.continuation);
    }
  }, [data]);
  const loadMore = useCallback(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <div className="px-6 mx-auto b-6 max-w-screen-2xl ">
        <ul
          role="list"
          className="grid sm:grid-cols-2 sm:gap-x-6 gap-y-6 sm:space-y-0 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5 "
        >
          {items?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <div className="flex justify-center w-full mx-auto my-4">
        {!hideLoadMoreButton && continuation && (
          <Button
            type={ButtonType.Main}
            title="Load more items"
            customClasses="px-7 py-3"
            icon={ReloadIcon}
            onClick={onLoadMore ?? loadMore}
          />
        )}
      </div>
    </>
  );
};
export default ProductList;
