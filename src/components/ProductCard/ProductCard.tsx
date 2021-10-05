import { FavouriteIcon } from 'assets';
import Button, { ButtonType } from '../Button';
import React, { FC } from 'react';
import { NFTItem } from 'types/NFTItem';
import Link from 'components/Link';
import Avatar from 'components/Avatar/Avatar';

type Props = {
  item: NFTItem;
};

const ProductCard: FC<Props> = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`}>
      <li className="text-white bold hover:bg-gray-900">
        <div className="flex flex-col justify-between h-full px-4 py-3 space-y-4 border border-gray-600 rounded-md">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to={`/profile/${item.ownerUsername}`}>
              <Avatar imageSrc={item.ownerProfileImageUrl} username={item.ownerUsername} verified={item.userVerified} />
            </Link>
            <div className="space-y-1 text-lg font-medium leading-6">
              <Link to={`/profile/${item.ownerUsername}`}>
                <h3 className="text-gray-500 hover:text-white">{`@ ${item.ownerUsername}`}</h3>
              </Link>
            </div>
          </div>

          <div className="aspect-w-3 aspect-h-2">
            <img className="object-cover rounded-lg shadow-lg" src={item.imageUrl} alt="" />
          </div>

          <div>
            <div className="px-4 text-lg font-medium leading-6 ">
              <h3>{item.title}</h3>
              <span>{item.price} ETH</span>
              <span className="px-1 text-gray-600 normal ">{`${item.availableQuantity}/${item.createdQuantity}`}</span>
            </div>
            <div className="flex items-end justify-between pl-4 text-lg font-medium leading-6">
              <Link to="#" title="Buy Now" />
              <Button
                customClasses="text-lg text-gray-600 py-0"
                icon={FavouriteIcon}
                type={ButtonType.Secondary}
                title={item.likes.toString()}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('liked');
                }}
              />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default ProductCard;
