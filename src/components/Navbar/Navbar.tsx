import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Logo, SunIcon, TwitterIcon, TelegramIcon, DiscordIcon, InstagramIcon } from 'assets';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Button from 'components/Button';
import { ButtonType } from 'components/Button/Button';
import Link, { LinkType } from 'components/Link/Link';
import HamburgerMenu from './HamburgerMenu';
import SearchBar from 'components/SearchBar/SearchBar';
import { useRouter } from 'next/router';
import { useWallet } from 'wallet/state';
//TODO update links
const socialButtons = [
  {
    icon: TwitterIcon,
    link: 'Twitter',
  },
  {
    icon: InstagramIcon,
    link: 'Instagram',
  },
  {
    icon: TelegramIcon,
    link: 'Telegram',
  },
  {
    icon: DiscordIcon,
    link: 'Discord',
  },
];
const renderSocialButtons = () => (
  <div className="flex gap-x-1 lg:gap-x-2 xl:gap-x:4">
    {socialButtons.map(({ link, icon }) => (
      <Button key={link} type={ButtonType.Main} equalPadding icon={icon} />
    ))}
  </div>
);

const Navbar: FC<unknown> = () => {
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const router = useRouter();
  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);
  const [state, dispatch] = useWallet();

  return (
    <nav className="bg-secondary">
      <div className="flex px-2 py-3.5 mx-auto md:py-0 md:h-24 max-w-screen-2xl sm:px-4 lg:px-8">
        <div className="flex items-center justify-between w-full px-2 lg:px-0 ">
          <div className="flex-shrink-0">
            <img className="block w-auto h-8 lg:hidden" src={Logo} alt="Rarible" />
            <div className="flex items-center">
              <img onClick={goToHome} className="hidden w-auto h-8 lg:block" src={Logo} alt="Rarible" />
              <span
                onClick={goToHome}
                className="hidden h-auto pl-3 text-xl font-bold text-white lg:block align-center"
              >
                Rarible
              </span>
            </div>
          </div>

          <SearchBar hidden={hamburgerOpened} />
          <div className="hidden lg:block lg:ml-6 lg:mr-6">
            <div className="flex items-center space-x-10">
              <Link type={LinkType.Main} title="Explore" to="/" />
              <Link type={LinkType.Secondary} title="How it works" to="#" />
            </div>
          </div>
          <div className="hidden lg:block lg:ml-4">
            <div className="flex items-center">{renderSocialButtons()} </div>
          </div>
          <div className="hidden lg:block lg:ml-6">
            <div className="flex items-center space-x-4 lg:space-12">
              <Button type={ButtonType.Primary} title="Create" onClick={() => router.push('/mint')} />
              <Button
                type={ButtonType.Secondary}
                title="Connect wallet"
                onClick={() => router.push('/wallet/connect')}
              />
              <Button type={ButtonType.Main} icon={SunIcon} equalPadding />
            </div>
          </div>
        </div>

        <div className="flex lg:hidden">
          {/* Mobile menu button */}
          <div
            onClick={() => setHamburgerOpened(!hamburgerOpened)}
            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {hamburgerOpened ? (
              <XIcon className="block w-6 h-6" aria-hidden="true" />
            ) : (
              <MenuIcon className="block w-6 h-6" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
      {hamburgerOpened && <HamburgerMenu renderSocialButtons={renderSocialButtons} />}
    </nav>
  );
};

export default Navbar;
