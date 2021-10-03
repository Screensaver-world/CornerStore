import React from 'react';
import HorizontalCard from 'components/HorizontalCard';
import { Currency, NFTItem, NFTOwner } from 'types';
import Tabs from 'components/Tabs';
import { useItemDetailsData } from 'features/home/details/useItemDetailsData';
import HistoryTab from 'features/home/details/components/HistoryTab';
import DetailsTab from 'features/home/details/components/DetailsTab';
import BidsTab from 'features/home/details/components/BidsTab';
import OwnersTab from 'features/home/details/components/OwnersTab';

type Props = {};

const props = {
  item: {
    name: '#44 Hopper - Abduction',
    description:
      'When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    imageUrls: [
      'https://lh3.googleusercontent.com/1rLhxHFIebBPBtCFeXCxiwdbIE2f2idunmGyU1RvgU7qk1TGiFHCORMepdQLt6b7uRYyn5FtlnLkTkO8kdTMsnvbHbTwpHEytcbz',
    ],
    price: '0.01',
    currency: Currency.ETH,
    availableQuantity: 10,
    totalQuantity: 12,
    royalties: 15,
  } as NFTItem,
  createdBy: {
    avatarUrl:
      'https://lh3.googleusercontent.com/1rLhxHFIebBPBtCFeXCxiwdbIE2f2idunmGyU1RvgU7qk1TGiFHCORMepdQLt6b7uRYyn5FtlnLkTkO8kdTMsnvbHbTwpHEytcbz',
    name: 'Branko Gvoka',
  } as NFTOwner,
  collection: {
    imageUrl:
      'https://lh3.googleusercontent.com/1rLhxHFIebBPBtCFeXCxiwdbIE2f2idunmGyU1RvgU7qk1TGiFHCORMepdQLt6b7uRYyn5FtlnLkTkO8kdTMsnvbHbTwpHEytcbz',
    name: 'Rarible',
  },
  owners: [
    {
      avatarUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
      price: '10,02',
      currency: Currency.ETH,
      name: 'mladibejn1',
      quantity: 2,
    },
    {
      avatarUrl: 'https://avatars.githubusercontent.com/u/6930914?v=4',
      price: '12,02',
      currency: Currency.ETH,
      name: 'mladibejn2',
      quantity: 3,
    },
  ],
};

function ItemDetailsPage({}: Props) {
  const { item, createdBy, collection } = props;
  const { isOwnersTab, isBidsTab, isDetailsTab, isHistoryTab, activeTab, tabs, setActiveTab } = useItemDetailsData();
  return (
    <div>
      <main className="mt-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-full lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="lg:col-start-8 lg:col-span-5">
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">{item.name}</h1>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
            <div className={'flex justify-center bg-secondary'}>
              {/*// todo fix*/}
              <img src={item.imageUrls[0]} className={'p-5 lg:p-16 w-full h-full'} />
            </div>
          </div>

          <div className="font-bold text-white mt-4 lg:col-span-5">
            <p className="pb-5">
              On sale for {item.price} {item.currency}{' '}
              <span className={'pl-5 text-gray-700'}>
                {item.availableQuantity} of {item.totalQuantity} Available
              </span>
            </p>

            <p className="font-semibold text-white pb-10">{item.description}</p>

            <div className={'flex flex-col xl:flex-row'}>
              <div className={'flex-1 xl:pr-8'}>
                <div className={'pb-5'}>
                  Creator <span className={'text-gray-700'}>{item.royalties}% Royalties </span>
                </div>
                <HorizontalCard title={createdBy.name} imageUrl={createdBy.avatarUrl} />
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
              {isDetailsTab && <DetailsTab owner={createdBy} categories={[collection]} />}
              {isHistoryTab && <HistoryTab />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ItemDetailsPage;
