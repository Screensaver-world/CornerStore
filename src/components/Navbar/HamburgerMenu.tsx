import React, { FC, ReactNode } from 'react';
import Link from 'components/Link/Link';
import Button from 'components/Button';
import { ButtonType } from 'components/Button/Button';

const navigationLinks = [
  { title: 'Explore', to: '#' },
  { title: 'My item', to: '#' },
  { title: 'How it works', to: '#' },
];
const renderLinks = () => (
  <>
    {navigationLinks.map(({ title, to }) => (
      <Link key={title} to={to}>
        <div className="pb-1 pt-4 font-bold">{title}</div>
      </Link>
    ))}
  </>
);
type Props = {
  renderSocialButtons: () => ReactNode;
};
const HamburgerMenu: FC<Props> = ({ renderSocialButtons }) => {
  return (
    <div className="lg:hidden w-screen h-screen bg-main flex-col flex fixed z-10">
      <div>
        <div className="px-8 divide-gray-300 divide-y pt-2 pb-3 space-y-1 flex flex-col text-white text-xl	">
          {renderLinks()}
          <div className="pt-10 flex justify-center"> {renderSocialButtons()}</div>
        </div>
      </div>
      <div className="flex justify-around w-full bottom-4 fixed">
        <Button type={ButtonType.Primary} title="Create" />
        <Button type={ButtonType.Secondary} title="Connect" />
      </div>
    </div>
  );
};

export default HamburgerMenu;
