import { ReloadIcon } from 'assets';
import Button from 'components/Button';
import { ButtonType } from 'components/Button/Button';
import React, { FC } from 'react';
import { NFTItem } from 'types/NFTItem';
import ProductCard from './ProductCard';

type Props = {
  items: NFTItem[];
  hideLoadMoreButton?: boolean;
  onLoadMore?: () => void;
};

const ProductList: FC<Props> = ({ items, hideLoadMoreButton = false, onLoadMore }) => {
  return (
    <div>
      <div className="mx-auto py-3 px-4 max-w-screen-2xl sm:px-6 lg:px-6 lg:py-6">
        <div className="space-y-12">
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:grid-cols-4 lg:gap-x-4 xl:grid-cols-5 "
          >
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full mx-auto justify-center my-4">
        {!hideLoadMoreButton && (
          <Button
            type={ButtonType.Main}
            title="Load more items"
            customClasses="px-7 py-3"
            icon={ReloadIcon}
            onClick={onLoadMore}
          />
        )}
      </div>
    </div>
  );
};
export default ProductList;
