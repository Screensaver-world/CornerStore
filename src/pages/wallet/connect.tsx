import { WalletImage, WalletPageCover } from 'assets';
import Breadcrumb from 'components/Breadcrumb';
import { routes } from 'pages/routes';
import React, { FC } from 'react';

const renderProfileImage = () => (
  <div className="flex-shrink-0">
    <img
      className="h-16 w-16 rounded-full border-2 border-gray-700"
      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      alt=""
    />
  </div>
);
const ConnectWalletPage: FC<unknown> = () => {
  return (
    <div className=" px-8 py-6 flex h-full text-white gap-x-8 items-center max-w-screen-2xl mx-auto">
      <div className="w-full h-full relative lg:block hidden">
        <img className="p-20 xl:p-40 z-10" src={WalletPageCover} />
        <div className="w-full h-full absolute top-0 left-0 opacity-10 bg-gradient-to-b from-primary-start to-primary-stop" />
      </div>
      <div className="w-full flex flex-col content-center h-full gap-y-4 lg:gap-y-6">
        <Breadcrumb path={[routes.Home, routes.ConnectWallet]} />
        <h1 className="text-xl">Connect your wallet</h1>
        <p>
          When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
          not only five centuries.
          <a className="block max-w-max text-blue-500" href="#">
            What is Wallet?
          </a>
        </p>
        <hr className="border-gray-600" />
        <div className="p-px bg-gradient-to-b from-primary-start to-primary-stop">
          <div className="bg-secondary relative px-8 py-8">
            <div className="flex flex-col gap-y-3 ">
              <div className="flex gap-x-3 flex-wrap">
                {renderProfileImage()}
                {renderProfileImage()}
                {renderProfileImage()}
              </div>
              <div>Connect Your Wallet</div>
              <div className="text-gray-500 text-sm">Connect with Rainbow, Tsrust, Argent and more</div>
            </div>
            <img className="transform absolute right-4 top-1/2  -translate-y-1/2	opacity-20 " src={WalletImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletPage;
