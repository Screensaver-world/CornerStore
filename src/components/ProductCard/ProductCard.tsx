import { FavouriteIcon } from '../../assets';
import Button from '../Button';
import { ButtonType } from '../Button/Button';
import React, { FC } from 'react';
import { NFTItem } from '../../types/NFTItem';

type Props = {
  item: NFTItem;
};

const ProductCard: FC<Props> = ({ item }) => {
  return (
    <li className="text-white bold">
      <div className="space-y-4 bg-secondary border border-gray-600 px-4 py-3 rounded-md flex flex-col justify-between h-full">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <img className="w-16 h-16 rounded-full lg:w-15 lg:h-15" src={item.ownerProfileImageUrl} alt="" />
          <div className="font-medium text-lg leading-6 space-y-1">
            <h3>{`@ ${item.ownerUsername}`}</h3>
          </div>
        </div>

        <div className="aspect-w-3 aspect-h-2">
          <img className="object-cover shadow-lg rounded-lg" src={item.imageUrl} alt="" />
        </div>

        <div>
          <div className="px-4 text-lg leading-6 font-medium ">
            <h3>{item.title}</h3>
            <span>{item.price} ETH</span>
            <span className="px-1 text-gray-600 normal	">{`${item.availableQuantity}/${item.createdQuantity}`}</span>
          </div>
          <div className="pl-4 text-lg leading-6 font-medium flex items-end	justify-between">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop">
              Buy Now
            </span>
            <Button
              customClasses="text-lg text-gray-600 py-0"
              icon={FavouriteIcon}
              type={ButtonType.Secondary}
              title={item.likes.toString()}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
export default ProductCard;
