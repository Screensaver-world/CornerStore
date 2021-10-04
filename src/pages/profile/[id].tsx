import { CopyIcon, CoverPhoto, DiscordIcon, InstagramIcon, TelegramIcon, TwitterIcon } from 'assets';
import * as React from 'react';
import { useRouter } from 'next/router';
import Button, { ButtonType } from 'components/Button';
import Link from 'components/Link';
import Tabs from 'components/Tabs/Tabs';
import { useCallback, useState } from 'react';
import { ProductList } from 'components/ProductCard';
import { dummyItems } from 'pages';

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
  const user = dummyData;
  const { address } = dummyData;
  const shortAddress = `${address.slice(0, 10)}...${address.slice(address.length - 4, address.length)}`;
  const [activeTab, setActiveTab] = useState(0);
  const onTabChange = useCallback(
    (index) => {
      setActiveTab(index);
    },
    [setActiveTab]
  );

  return (
    <>
      <div className="flex flex-col items-center text-white max-w-screen-2xl  text-2xl m-auto">
        <img className=" overflow-hidden" src={CoverPhoto} />
        <div className="bg-secondary lg:w-2/3 w-11/12 sm:w-10/12 relative md:-top-16 -top-4 flex flex-col items-center">
          <img
            className="w-10 h-10 rounded-full lg:w-32 lg:h-32 relative md:-top-5 lg:-top-16 -top-5 md:w-20 md:h-20 md:-top-10 "
            src={'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}
            alt=""
          />
          <h1 className="lg:text-5xl md:text-4xl text-2xl -top-4 relative ">{user.name}</h1>
          <div className="flex gap-y-4 items-center gap-x-10 flex-col sm:flex-row md:gap-x-20 text-lg md:text-2xl md:pt-4">
            <Link title={`@${user.twitterUsername}`} to="#" />
            <div className="flex items-center gap-x-4 bg-main px-3 py-2">
              <div>{shortAddress}</div>
              <Button type={ButtonType.Secondary} icon={CopyIcon} equalPadding />
            </div>
          </div>
          <p className="text-center py-10 px-5 sm:px-0 text-lg md:w-9/12 sm:px-4">{user.about}</p>
          <div className="flex sm:justify-between justify-center md:w-9/12 w-full px-4 md:px-0 pb-4">
            <div className="sm:flex gap-x-1 lg:gap-x-2 xl:gap-x:4 hidden ">
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
        <ProductList items={new Array(4).fill(dummyItems).flat()} hideLoadMoreButton />
      </div>
    </>
  );
};

export default Home;
