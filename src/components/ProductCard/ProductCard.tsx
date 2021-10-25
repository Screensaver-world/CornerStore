import { FavouriteIcon } from 'assets';
import Button, { ButtonType } from '../Button';
import React, { FC, useState, useEffect } from 'react';
import Link from 'components/Link';
import Avatar from 'components/Avatar/Avatar';
import { NtfItem, SellOrderTake } from 'api/raribleRequestTypes';
import { getImage, shortAddress } from 'utils/itemUtils';
import { useToggle } from 'hooks/useToggle';
import CheckoutModal from 'features/home/details/components/CheckoutModal';
import { getOnboard } from 'utils/walletUtils';
import { useWallet } from 'wallet/state';

type Props = {
  item: NtfItem;
  sellOrder: { take?: SellOrderTake; hash: string };
};

const ProductCard: FC<Props> = ({ item, sellOrder }) => {
  const address = shortAddress(item?.creators?.[0]?.account ?? '0x000', 5, 4);

  const image = getImage(item.meta);
  const [renderFavButton, setRenderFavButton] = useState(false);
  const [isCheckoutVisible, setCheckoutVisible] = useToggle(false);
  const [state, dispatch] = useWallet();
  useEffect(() => {
    setRenderFavButton(true);
  }, []);

  return (
    <Link to={`/item/${item.id}`}>
      <li className="text-white bold hover:bg-gray-900">
        <div className="flex flex-col justify-between h-full px-4 py-3 space-y-4 border border-gray-600 rounded-md">
          <div className="flex items-center space-x-4">
            <Link to={`/profile/${item?.creators?.[0].account}`}>
              <Avatar
                username={item?.creators?.[0].account}
                // verified={item.userVerified}
              />
            </Link>
            <div className="space-y-1 font-medium leading-6 text-small">
              <Link to={`/profile/${item?.creators?.[0].account}`}>
                <h3 className="text-gray-700 hover:text-white">{`${address}`}</h3>
              </Link>
            </div>
          </div>

          <div className="flex justify-center aspect-w-3 aspect-h-2">
            <img className="object-cover rounded-lg shadow-lg" src={image} alt="" />
          </div>

          <div>
            <div className="font-bold leading-6">
              <h3 className={'text-lg'}>{item?.meta?.name}</h3>
              {sellOrder && (
                <span className={'text-sm'}>
                  {sellOrder?.take?.valueDecimal} {sellOrder?.take?.assetType?.assetClass}
                </span>
              )}
              <span className="px-1 text-gray-600 normal">1/1</span>
            </div>
            <div className="flex items-end justify-between font-bold leading-6">
              <div className={`${!sellOrder?.take?.valueDecimal ? 'invisible' : ''}`}>
                <Link
                  title="Buy Now"
                  onClick={async (e) => {
                    e.stopPropagation();
                    const onboard = getOnboard(dispatch);
                    if (state.address || ((await onboard.walletSelect()) && (await onboard.walletCheck()))) {
                      setCheckoutVisible(true);
                    }
                  }}
                />
              </div>
              {isCheckoutVisible && state.balance !== '-1' && (
                <CheckoutModal
                  title={item?.meta?.name}
                  isOpen={isCheckoutVisible}
                  onClose={setCheckoutVisible}
                  currency={sellOrder?.take?.assetType?.assetClass}
                  orderHash={sellOrder.hash}
                  price={sellOrder?.take.value}
                  //TODO should we hide avail. quan. since we use erc721
                  // availableQuantity={item.availableQuantity}
                />
              )}
              {renderFavButton && (
                <Button
                  customClasses="text-gray-600 py-0"
                  icon={FavouriteIcon}
                  equalPadding
                  type={ButtonType.Main}
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
