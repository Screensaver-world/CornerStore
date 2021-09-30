import { FavouriteIcon } from '../../assets';
import Button from '../Button';
import { ButtonType } from '../Button/Button';
import React, { FC } from 'react';
import { NFTItem } from '../../types/NFTItem';
import Link from 'components/Link/Link';

type Props = {
  item: NFTItem;
};

const ProductCard: FC<Props> = ({ item }) => {
  return (
    <li className="text-white bold">
      <div className="space-y-4 border border-gray-600 px-4 py-3 rounded-md flex flex-col justify-between h-full">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link to="#">
            <img className="w-16 h-16 rounded-full lg:w-15 lg:h-15" src={item.ownerProfileImageUrl} alt="" />
          </Link>
          <div className="font-medium	text-lg leading-6 space-y-1">
            <Link to="#">
              <h3 className="text-gray-500 hover:text-white">{`@ ${item.ownerUsername}`}</h3>
            </Link>
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
            <Link to="#" title="Buy Now" />
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
