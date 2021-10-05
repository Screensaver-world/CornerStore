import React, { FC } from 'react';
import styles from './PurchaseDropdown.module.css';

const itemClasses =
  'px-2 py-2 relative hover:text-transparent bg-clip-text bg-gradient-to-b from-primary-start to-primary-stop ';

const OverlayClasses =
  'w-full bg-red-300 py-2 h-full absolute left-0 top-0 bg-gradient-to-b  from-secondary to-secondary hover:from-primary-start hover:to-primary-stop opacity-10';
const renderListItem = ({ title, handler }: { title: string; handler?: () => void }) => (
  <li className={itemClasses} onClick={handler}>
    {title}
    <div className={OverlayClasses}></div>
  </li>
);

const PurchaseDropdown: FC<unknown> = () => {
  const menuItems = [
    {
      title: 'New Bid',
      handler: () => {
        console.log('clicked');
      },
    },
    {
      title: 'Purchase Now',
    },
    {
      title: 'View on Opensea',
    },
    {
      title: 'Share',
    },
    {
      title: 'Report',
    },
  ];
  return (
    <ul
      className={`${styles.dropdown} z-10 relative -bottom-1 flex flex-col text-white absolute right-0 min-w-max bg-secondary text-xl gap-y-4 px-2 py-2 border border-gray-900`}
    >
      {menuItems.map((item) => renderListItem(item))}
    </ul>
  );
};

export default PurchaseDropdown;
