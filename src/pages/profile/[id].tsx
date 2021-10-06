import { CopyIcon, CoverPhoto, DiscordIcon, InstagramIcon, TelegramIcon, TwitterIcon } from 'assets';
import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Button, { ButtonType } from 'components/Button';
import Link from 'components/Link';
import Tabs from 'components/Tabs/Tabs';
import { ProductList } from 'components/ProductCard';
import { dummyItems } from 'pages';
import ActivityCard from 'components/ActivityCard/ActivityCard';
import Avatar from 'components/Avatar/Avatar';

//MOCKED DATA
const dummyData = {
  name: 'Katherine Moss',
  twitterUsername: 'twuser',
  address: '0X1243567853467352466U7I546786457890',
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

export interface ProfileProps {
  name: string;
  twitterUsername: string;
  address: string;
  about: string;
  links?: { twitter?: string; instagram?: string };
  site: string;
}

const Home: React.FunctionComponent<null> = () => {
  const router = useRouter();
  const { id } = router.query; //user id will be here
  const [activeTab, setActiveTab] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  const user = dummyData;
  const { address } = dummyData;
  const shortAddress = `${address.slice(0, 10)}...${address.slice(address.length - 4, address.length)}`;
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
        `/profile/${id}?tab=${tabs[index]}`,
        { scroll: false, shallow: true }
      );
    },
    [id]
  );

  const renderProductList = useCallback(
    (items) => (
      <div className="pt-6">
        <ProductList
          items={new Array(4)
            .fill(dummyItems)
            .flat()
            .map((item) => ({ ...item, id: Math.random() }))}
          hideLoadMoreButton
        />
      </div>
    ),
    []
  );

  return (
    <>
      <div className="flex flex-col items-center m-auto text-2xl text-white max-w-screen-2xl">
        <img className="overflow-hidden " src={CoverPhoto} />
        <div className="relative flex flex-col items-center w-11/12 bg-secondary lg:w-2/3 sm:w-10/12 md:-top-16 -top-4">
          <div className="transform -translate-y-1/2">
            <Avatar
              verified
              sizeClasses="w-20 h-20 lg:w-40 lg:h-40"
              verificationSymbolSizes={'w-6 h-6 lg:w-14 lg:h-14'}
              username="USERNAME"
              imageSrc="https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160710209/60039275-young-male-cartoon-profile-vector-illustration-graphic-design-.jpg"
            />
          </div>
          <h1 className="relative text-2xl lg:text-5xl md:text-4xl -top-4 ">{user.name}</h1>
          <div className="flex flex-col items-center text-lg gap-y-4 gap-x-10 sm:flex-row md:gap-x-20 md:text-2xl md:pt-4">
            <Link title={`@${user.twitterUsername}`} to="#" />
            <div className="flex items-center px-3 py-2 gap-x-4 bg-main">
              <div>{shortAddress}</div>
              <Button type={ButtonType.Secondary} icon={CopyIcon} equalPadding />
            </div>
          </div>
          <p className="px-5 py-10 text-lg text-center sm:px-0 md:w-9/12 sm:px-4">{user.about}</p>
          <div className="flex justify-center w-full px-4 pb-4 sm:justify-between md:w-9/12 md:px-0">
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
      <div className="bg-secondary">
        {activeTab === 0 && renderProductList(null)}

        {/*TODO update these to use real data*/}
        {activeTab === 1 && renderProductList(null)}
        {activeTab === 1 && renderProductList(null)}

        {activeTab === 3 && (
          <div>
            <div className="max-w-screen-lg px-4 py-3 mx-auto sm:px-6 lg:px-6 lg:py-6">
              <div className="space-y-12">
                <ul role="list">
                  {dummyHistory.map((item) => (
                    <ActivityCard {...item} username="Katherine Moss" userId="0X1243567853467352466U7I546786457890" />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
