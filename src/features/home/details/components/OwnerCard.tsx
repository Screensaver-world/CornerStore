import { NtfItem } from 'api/raribleRequestTypes';
import Button from 'components/Button';
import HorizontalCard from 'components/HorizontalCard';
import makeBlockie from 'ethereum-blockies-base64';
import { useToggle } from 'hooks/useToggle';
import React from 'react';
import { shortAddress } from 'utils/itemUtils';
import { getOnboard } from 'utils/walletUtils';
import { useWallet } from 'wallet/state';
import PutOnSaleModal from '../sales/PutOnSaleModal';
import CheckoutModal from './CheckoutModal';

type Props = {
  owner: string;
  sellOrder?: any;
  item: NtfItem;
};

function OwnerCard({ owner, sellOrder, item }: Props) {
  const [{ address, raribleSDK, balance }, dispatch] = useWallet();
  const [isCheckoutVisible, setCheckoutVisible] = useToggle(false);
  const isOwner = owner === address;
  const [isPutOnSaleVisible, setPutOnSaleVisible] = useToggle(false);

  const renderButton = () => {
    if (!sellOrder && !isOwner) {
      return null;
    }

    const options = {
      order: {
        owner: {
          title: 'Remove from Sale',
          onClick: async () => {
            await (await raribleSDK.order.cancel(sellOrder)).wait();
            location.reload();
          },
        },
        notOwner: {
          title: 'Buy',
          onClick: async () => {
            const onboard = getOnboard(dispatch);
            if (address || ((await onboard.walletSelect()) && (await onboard.walletCheck()))) {
              setCheckoutVisible(true);
            }
          },
        },
      },
      noOrder: {
        owner: { title: 'Put on Sale', onClick: setPutOnSaleVisible },
      },
    };

    const { title, onClick } = options[sellOrder ? 'order' : 'noOrder'][isOwner ? 'owner' : 'notOwner'];
    return <Button fullWidth title={title} onClick={onClick} customClasses="sticky bottom-4 lg:static" />;
  };

  return (
    <>
      <HorizontalCard
        imageUrl={makeBlockie(owner ?? '0x000')}
        title={shortAddress(owner, 6, 8)}
        subtitle={
          sellOrder ? (
            <span>
              On sale for{' '}
              <span className={'font-bold text-white'}>
                {sellOrder.take.valueDecimal} {sellOrder.take.assetType.assetClass}
              </span>
            </span>
          ) : (
            'Not for sale'
          )
        }
        actions={<div className="z-10">{renderButton()} </div>}
      />
      {isCheckoutVisible && balance !== '-1' && (
        <CheckoutModal
          title={item?.meta?.name}
          isOpen={isCheckoutVisible}
          onClose={setCheckoutVisible}
          currency={sellOrder?.take?.assetType?.assetClass}
          orderHash={sellOrder?.hash}
          price={sellOrder?.take.value}
          //TODO should we hide avail. quan. since we use erc721
          // availableQuantity={item.availableQuantity}
        />
      )}
      {isPutOnSaleVisible && (
        <PutOnSaleModal
          isOpen={isPutOnSaleVisible}
          onClose={setPutOnSaleVisible}
          tokenId={item.tokenId}
          //TODO should we hide avail. quan. since we use erc721
          // availableQuantity={item.availableQuantity}
        />
      )}
    </>
  );
}

export default OwnerCard;
