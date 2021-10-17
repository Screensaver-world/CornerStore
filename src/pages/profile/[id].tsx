import { CopyIcon, CoverPhoto, DiscordIcon, InstagramIcon, TelegramIcon, TwitterIcon } from 'assets';
import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Button, { ButtonType } from 'components/Button';
import Link from 'components/Link';
import Tabs from 'components/Tabs/Tabs';
import ActivityCard from 'components/ActivityCard/ActivityCard';
import Avatar from 'components/Avatar/Avatar';
import { getNftItems, useGetNftItems } from 'api/raribleApi';
import { GetNftItemsResponse, NftItemsRequestType, NtfItem, OrderRequestTypes } from 'api/raribleRequestTypes';
import { shortAddress } from 'utils/itemUtils';
import CreatedTab from 'features/profile/components/CreatedTab';
import OwnedTab from 'features/profile/components/OwnedTab';
import ActivityHistoryTab from 'features/profile/components/ActivityHistoryTab';

//MOCKED DATA
const dummyData = {
  twitterUsername: 'twuser',
  about:
    'When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset too good.',
  links: { twitter: 'asds', instagram: 'hgk' },
  site: 'www.google.com',
};

const dummyHistory = [
  {
    title: 'Some Random NFT',
    date: new Date(),
    actionType: 'mint' as 'mint' | 'transfer' | 'burn',
    owner: '0X1243567853467352466U7I546786457890',
    links: { twitter: 'asds', instagram: 'hgk' },
    site: 'www.google.com',
    profileImage:
      'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160710209/60039275-young-male-cartoon-profile-vector-illustration-graphic-design-.jpg',
  },
  {
    title: 'Some Random NFT 2',
    date: new Date(),
    actionType: 'transfer' as 'mint' | 'transfer' | 'burn',
    owner: '0X1243567853467352466U7I546786457890',
    seller: '687687678678678686868768768768686',
    links: { twitter: 'asds', instagram: 'hgk' },
    site: 'www.google.com',
    profileImage:
      'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160710209/60039275-young-male-cartoon-profile-vector-illustration-graphic-design-.jpg',
  },
  {
    title: 'Some Random NFT 3',
    date: new Date(),
    actionType: 'transfer' as 'mint' | 'transfer' | 'burn',
    owner: '687687678678678686868768768768686',
    seller: '0X1243567853467352466U7I546786457890',
    links: { twitter: 'asds', instagram: 'hgk' },
    site: 'www.google.com',
    profileImage:
      'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160710209/60039275-young-male-cartoon-profile-vector-illustration-graphic-design-.jpg',
  },
  {
    title: 'Some Random NFT 4',
    date: new Date(),
    actionType: 'burn' as 'mint' | 'transfer' | 'burn',
    owner: '0X1243567853467352466U7I546786457890',
    links: { twitter: 'asds', instagram: 'hgk' },
    site: 'www.google.com',
    profileImage:
      'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160710209/60039275-young-male-cartoon-profile-vector-illustration-graphic-design-.jpg',
  },
];

const tabs = ['On sale', 'Owned', 'Created', 'Activity'];

const tabItemsTypeMapping = {
  [tabs[0]]: OrderRequestTypes.SELL,
  [tabs[1]]: NftItemsRequestType.BY_OWNER,
  [tabs[2]]: NftItemsRequestType.BY_CREATOR,
};

export interface ProfileProps {
  onSaleData?: GetNftItemsResponse;
  createdData?: GetNftItemsResponse;
  ownedData?: GetNftItemsResponse;
  activityHistory?: GetNftItemsResponse;
  tab: number;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ onSaleData, ownedData, createdData, tab }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tab);
  const [userId, setUserId] = useState<string | null>(null);
  const user = dummyData;
  const shortAddr = shortAddress(userId, 10, 4);
  useEffect(() => {
    if (router && router.query) {
      setActiveTab(
        Math.max(
          tabs.findIndex((tab) => tab === router.query.tab),
          0
        )
      );
      setUserId(router.query.id as string);
    }
  }, [router]);

  const commonQueryData = { size: 1, includeMeta: true, address: userId };

  //------
  const [onSaleContinuation, setOnSaleContinuation] = useState(onSaleData?.continuation);
  const {
    data: onSale,
    refetch: refetchOnSale,
    isIdle: isIdleOOnSale,
  } = useGetNftItems({
    type: NftItemsRequestType.BY_OWNER,
    continuation: onSaleContinuation,
    ...commonQueryData,
  });
  const [onSaleItems, setOnSaleItems] = useState<NtfItem[]>(onSaleData?.items ?? []);
  useEffect(() => {
    if (onSale) {
      setOnSaleItems([...onSaleItems, ...onSale.items]);
      setOnSaleContinuation(onSale.continuation);
    }
  }, [onSale]);

  const onTabChange = useCallback(
    (index) => {
      router.push(
        {
          pathname: window.location.pathname,
          query: {
            id: router.query.id,
            tab: tabs[index],
          },
        },
        `/profile/${userId}?tab=${tabs[index]}`,
        { scroll: false, shallow: true }
      );
      setActiveTab(index);
    },
    [userId]
  );

  return (
    <>
      <div className="flex flex-col items-center m-auto text-lg text-white max-w-screen-2xl">
        <img className="overflow-hidden " src={CoverPhoto} />
        <div className="relative flex flex-col items-center w-11/12 bg-secondary lg:w-2/3 sm:w-10/12 md:-top-16 -top-4">
          <div className="transform -translate-y-1/2">
            <Avatar
              sizeClasses="w-20 h-20 lg:w-48 lg:h-48"
              verificationSymbolSizes={'w-6 h-6 lg:w-14 lg:h-14'}
              username={userId}
            />
          </div>
          <h1 className="relative text-lg font-bold lg:text-2xl md:text-4xl -top-4 ">{userId}</h1>
          <div className="flex flex-col items-center text-lg font-medium gap-y-4 gap-x-10 sm:flex-row md:gap-x-20 md:pt-4">
            <Link title={`@${user.twitterUsername}`} to="#" />
            <div className="flex items-center px-3 py-2 gap-x-4 bg-main">
              <div>{shortAddr}</div>
              <Button type={ButtonType.Secondary} icon={CopyIcon} equalPadding />
            </div>
          </div>
          <p className="px-5 py-10 text-base font-semibold text-center md:w-9/12 sm:px-4">{user.about}</p>
          <div className="flex items-center justify-center w-full px-4 pb-9 sm:justify-between md:w-9/12 md:px-0">
            <div className="hidden sm:flex gap-x-1 lg:gap-x-2 xl:gap-x:4 ">
              <Button type={ButtonType.Main} equalPadding icon={TwitterIcon} />
              <Button type={ButtonType.Main} equalPadding icon={InstagramIcon} />
              <Button type={ButtonType.Main} equalPadding icon={TelegramIcon} />
              <Button type={ButtonType.Main} equalPadding icon={DiscordIcon} />
            </div>
            <Link to={user.site} title={user.site} />
          </div>
        </div>
      </div>
      <Tabs titles={tabs} active={activeTab} onChange={onTabChange} />
      <div className="py-4 bg-secondary">
        {activeTab === 1 && <OwnedTab initialData={ownedData} address={userId} />}
        {activeTab === 2 && <CreatedTab initialData={createdData} address={userId} />}
        {activeTab === 3 && <ActivityHistoryTab address={userId} />}
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const address = context.query.id;
  const tabName = context.query.tab ?? tabs[0];
  const props: ProfileProps = { tab: tabs.indexOf(tabName) };
  const commonQueryData = { size: 1, showDeleted: false, includeMeta: true, address };
  switch (tabName) {
    case tabs[0]:
      props.ownedData = await getNftItems({
        ...commonQueryData,
        type: tabItemsTypeMapping[tabName] as NftItemsRequestType,
      });
      break;
    case tabs[1]:
      props.ownedData = await getNftItems({
        ...commonQueryData,
        type: tabItemsTypeMapping[tabName] as NftItemsRequestType,
      });
      break;
    case tabs[2]:
      props.createdData = await getNftItems({
        ...commonQueryData,
        type: tabItemsTypeMapping[tabName] as NftItemsRequestType,
      });
      break;
  }
  // console.log(
  //   (await getNftOrders({ size: 1, address, filterBy: OrderFilter.BY_MAKER, type: OrderRequestTypes.SELL })).orders[0]
  // );

  return {
    props, // will be passed to the page component as props
  };
}

export default Profile;
