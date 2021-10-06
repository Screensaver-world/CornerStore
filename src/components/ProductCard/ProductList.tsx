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
    <>
      <div className="px-6 mx-auto b-6 max-w-screen-2xl ">
        <ul
          role="list"
          className="grid sm:grid-cols-2 sm:gap-x-6 gap-y-6 sm:space-y-0 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5 "
        >
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <div className="flex justify-center w-full mx-auto my-4">
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
    </>
  );
};
export default ProductList;
