import { FavouriteIcon } from 'assets';
import Button, { ButtonType } from '../Button';
import React, { FC, useState, useEffect } from 'react';
import Link from 'components/Link';
import Avatar from 'components/Avatar/Avatar';
import { NftItemMeta, NtfItem } from 'api/raribleRequestTypes';

type Props = {
  item: NtfItem;
};

//const pickBestImage = (url: NftMedia}): string => url?.PREVIEW ?? url?.ORIGINAL ?? url?.BIG;

const getImage = (meta: NftItemMeta) => {
  if (!meta?.image) {
    return null;
  }
  const { url } = meta?.image ?? {};

  const img = url?.PREVIEW ?? url?.ORIGINAL ?? url?.BIG;
  return img?.startsWith('ipfs') ? img.replace('ipfs://', 'https://ipfs.io/') : img;
};

const ProductCard: FC<Props> = ({ item }) => {
  const shortAddress = `${item.creators[0].account.slice(0, 5)}...${item.creators[0].account.slice(
    item.creators[0].account.length - 4,
    item.creators[0].account.length
  )}`;

  const image = getImage(item.meta);
  const [renderFavButton, setRenderFavButton] = useState(false);

  useEffect(() => {
    setRenderFavButton(true);
  }, []);

  return (
    <Link to={`/item/${item.id}`}>
      <li className="text-white bold hover:bg-gray-900">
        <div className="flex flex-col justify-between h-full px-4 py-3 space-y-4 border border-gray-600 rounded-md">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to={`/profile/${item.creators[0].account}`}>
              <Avatar
                username={shortAddress}
                // verified={item.userVerified}
              />
            </Link>
            <div className="space-y-1 text-lg font-medium leading-6">
              <Link to={`/profile/${item.creators[0].account}`}>
                <h3 className="text-gray-500 hover:text-white">{`${shortAddress}`}</h3>
              </Link>
            </div>
          </div>

          <div className="flex justify-center aspect-w-3 aspect-h-2">
            <img className="object-cover rounded-lg shadow-lg" src={image} alt="" />
          </div>

          <div>
            <div className="px-4 text-lg font-medium leading-6 ">
              <h3>{item.meta.name}</h3>
              <span>
                {/* {item.price}  */}
                ETH
              </span>
              <span className="px-1 text-gray-600 normal ">
                {/* {`${item.availableQuantity}/${item.createdQuantity}`} */}
                1/1
              </span>
            </div>
            <div className="flex items-end justify-between pl-4 text-lg font-medium leading-6">
              <Link to="#" title="Buy Now" />
              {renderFavButton && (
                <Button
                  customClasses="text-lg text-gray-600 py-0"
                  icon={FavouriteIcon}
                  equalPadding
                  type={ButtonType.Secondary}
                  // title={item.likes.toString()}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('liked');
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default ProductCard;
