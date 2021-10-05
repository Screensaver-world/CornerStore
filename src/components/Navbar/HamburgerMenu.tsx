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
        <div className="pt-4 pb-1 font-bold">{title}</div>
      </Link>
    ))}
  </>
);
type Props = {
  renderSocialButtons: () => ReactNode;
};
const HamburgerMenu: FC<Props> = ({ renderSocialButtons }) => {
  return (
    <div className="fixed z-10 flex flex-col w-screen h-screen lg:hidden bg-main">
      <div>
        <div className="flex flex-col px-8 pt-2 pb-3 text-white divide-gray-300 divide-y space-y-1 text-xl	">
          {renderLinks()}
          <div className="flex justify-center pt-10"> {renderSocialButtons()}</div>
        </div>
      </div>
      <div className="fixed flex justify-around w-full bottom-4">
        <Button type={ButtonType.Primary} title="Create" />
        <Button type={ButtonType.Secondary} title="Connect" />
      </div>
    </div>
  );
};

export default HamburgerMenu;
