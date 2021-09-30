import React, { FC } from 'react';
import { NFTItem } from 'types/NFTItem';
import ProductCard from './ProductCard';

type Props = {
  items: NFTItem[];
};

const ProductList: FC<Props> = ({ items }) => {
  return (
    <div className="bg-secondary">
      <div className="mx-auto py-12 px-4 max-w-screen-2xl sm:px-6 lg:px-6 lg:py-24">
        <div className="space-y-12">
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:grid-cols-4 lg:gap-x-3 xl:grid-cols-5 "
          >
            {items.map((item) => (
              <ProductCard item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
