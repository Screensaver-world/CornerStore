import { Popover } from '@headlessui/react';
import styles from './ProfileDropdown.module.css';
import React, { FC } from 'react';
import { useWallet } from 'wallet/state';
import makeBlockie from 'ethereum-blockies-base64';
import Avatar from 'components/Avatar/Avatar';
import Web3 from 'web3';
import { getOnboard } from 'utils/walletUtils';
import { useRouter } from 'next/router';

const itemClasses =
  'px-2 py-2 relative hover:text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop';

const overlayClasses =
  'w-full bg-red-300 py-3 h-full absolute left-0 top-0 bg-gradient-to-b from-secondary to-secondary hover:from-primary-start hover:to-primary-stop opacity-10 rounded-md';

const renderListItem = ({ title, handler }: { title: string; handler?: () => void }) => (
  <li className={itemClasses} onClick={handler} key={title}>
    {title}
    <div className={overlayClasses} />
  </li>
);
const ProfileDropdown: FC<unknown> = () => {
  const [state, dispatch] = useWallet();
  const router = useRouter();
  const menuItems = [
    {
      title: 'My items',
      handler: () => {
        router.push(`/profile/${state.address}?tab=Owned`);
      },
    },
    {
      title: 'Edit profile',
    },
    {
      title: 'Disconnect',
      handler: () => {
        getOnboard(dispatch).walletReset();
        localStorage.removeItem('walletName');
        dispatch({ type: 'RESET' });
      },
    },
  ];

  return (
    <div className="relative flex justify-center">
      <Popover className="relative flex text-white">
        <Popover.Button>
          <img className="h-10" src={makeBlockie(state.address)} />
        </Popover.Button>
        <Popover.Panel className="absolute right-0 z-10 text-white top-11">
          <div className="flex ">
            <ul
              className={`${styles.dropdown} p-2 z-10 font-semibold  -bottom-1 flex flex-col text-white  right-0 min-w-max bg-gray-800 rounded-md text-sm gap-y-4 px-4 py-4 border border-gray-900`}
            >
              <li className="flex w-full px-4 py-3 bg-main gap-x-4">
                <Avatar sizeClasses="h-10 w-10 " username={state.address} />
                <div className="flex flex-col justify-center">
                  <div>{Web3?.utils?.fromWei(state?.balance ?? '0')} ETH</div>
                  <div className="text-sm text-gray-600">Balance</div>
                </div>
              </li>

              {menuItems.map((item) => renderListItem(item))}
            </ul>
          </div>
        </Popover.Panel>
      </Popover>
      ;
    </div>
  );
};

export default ProfileDropdown;
