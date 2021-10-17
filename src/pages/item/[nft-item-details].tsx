import React, { useEffect, useState } from 'react';
import HorizontalCard from 'components/HorizontalCard';
import Tabs from 'components/Tabs';
import { useItemDetailsData } from 'features/home/details/useItemDetailsData';
import HistoryTab from 'features/home/details/components/HistoryTab';
import DetailsTab from 'features/home/details/components/DetailsTab';
import BidsTab from 'features/home/details/components/BidsTab';
import OwnersTab from 'features/home/details/components/OwnersTab';
import Button, { ButtonType } from 'components/Button';
import CheckoutModal from '../../features/home/details/components/CheckoutModal';
import { useToggle } from '../../hooks/useToggle';
import { DotsIcon } from 'assets';
import PurchaseDropdown from 'features/home/details/components/PurchaseDropdown';
import { Popover } from '@headlessui/react';
import { getNftItemById, getNftOrders } from 'api/raribleApi';
import makeBlockie from 'ethereum-blockies-base64';
import { getImage, shortAddress } from 'utils/itemUtils';
import { NtfItem, OrderFilter, OrderRequestTypes } from 'api/raribleRequestTypes';

//TODO fix types.. here and in queries :)
type Props = { item: any; sellOrder: any };

function ItemDetailsPage({ item, sellOrder }: Props) {
  console.log(sellOrder);
  const collection = {
    imageUrl:
      'https://lh3.googleusercontent.com/1rLhxHFIebBPBtCFeXCxiwdbIE2f2idunmGyU1RvgU7qk1TGiFHCORMepdQLt6b7uRYyn5FtlnLkTkO8kdTMsnvbHbTwpHEytcbz',
    name: 'Rarible',
  };
  const { isOwnersTab, isBidsTab, isDetailsTab, isHistoryTab, activeTab, tabs, setActiveTab } = useItemDetailsData();
  const [isCheckoutVisible, setCheckoutVisible] = useToggle(false);
  const [creatorAvatar, setCreatorAvatar] = useState(null);

  useEffect(() => {
    setCreatorAvatar(makeBlockie(item.creators[0].account ?? ''));
  }, []);

  return (
    <div>
      <main className="max-w-2xl px-4 pb-16 mx-auto mt-8 sm:pb-24 sm:px-6 lg:max-w-full lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="lg:col-start-8 lg:col-span-5">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold text-white">{item.meta.name}</h1>
              <Popover className="relative text-white">
                <Popover.Button>
                  <Button icon={DotsIcon} type={ButtonType.Secondary} />
                </Popover.Button>
                <Popover.Panel className="absolute right-0 z-10 text-white">
                  <div className="absolute right-0 flex">
                    <PurchaseDropdown />
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </div>

          {/*// LEFT SIDE CONTENT*/}
          <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
            <div className={'flex justify-center bg-secondary'}>
              {/*// todo fix*/}
              <img src={getImage(item.meta, true)} className={'p-5 lg:p-16 w-full h-full'} />
            </div>
          </div>

          {/*RIGHT SIDE CONTENT*/}
          <div className="mt-4 font-bold text-white lg:col-span-5">
            <p className="pb-5">
              On sale for {sellOrder?.take.valueDecimal} {sellOrder?.take.assetType.assetClass}{' '}
              {/*
              TODO: check if it is ok to delete this since we'll be using erc721
              <span className={'pl-5 text-gray-700'}>
                {item.availableQuantity} of {item.totalQuantity} Available
              </span> */}
            </p>

            <p className="pb-10 font-semibold text-white">{item.meta.description}</p>

            <div className={'flex flex-col xl:flex-row'}>
              <div className={'flex-1 xl:pr-8'}>
                <div className={'pb-5'}>
                  Creator <span className={'text-gray-700'}>{item?.royalties?.[0]?.value / 100 || 0}% Royalties </span>
                </div>
                <HorizontalCard title={shortAddress(item.creators[0].account, 6, 4)} imageUrl={creatorAvatar} />
              </div>
              <div className={'flex-1 mt-4 xl:mt-0 xl:pl-8'}>
                <div className={'pb-5'}>Collection</div>
                <HorizontalCard title={collection.name} imageUrl={collection.imageUrl} />
              </div>
            </div>
            <div className={'flex flex-1 justify-start pt-5'}>
              <Tabs titles={tabs} active={activeTab} onChange={setActiveTab} />
            </div>
            <div className={'pt-5'}>
              {isOwnersTab && <OwnersTab total={item.totalQuantity} />}
              {isBidsTab && <BidsTab />}
              {isDetailsTab && <DetailsTab owner={item.owners[0]} categories={[collection]} />}
              {isHistoryTab && <HistoryTab />}
            </div>
            <Button
              fullWidth
              title={`Buy for ${sellOrder.take.valueDecimal} ${sellOrder?.take.assetType.assetClass}`}
              onClick={setCheckoutVisible}
              customClasses="sticky bottom-4 lg:static"
            />
            {isCheckoutVisible && (
              <CheckoutModal
                isOpen={isCheckoutVisible}
                onClose={setCheckoutVisible}
                //TODO should we hide avail. quan. since we use erc721
                availableQuantity={item.availableQuantity}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query['nft-item-details'];
  const tab = context.query.tab ?? 'Owners';
  const [item, orders] = await Promise.all([
    await getNftItemById(id),
    await getNftOrders({ address: id, filerBy: OrderFilter.BY_ITEM, type: OrderRequestTypes.SELL }),
  ]);
  //TODO check if it is possible to have multiple sell orders, what happens after buy order is executed
  return {
    props: { item, sellOrder: orders?.orders?.[0] }, // will be passed to the page component as props
  };
}

export default ItemDetailsPage;
