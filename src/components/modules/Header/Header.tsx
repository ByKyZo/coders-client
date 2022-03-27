import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { RiCodeLine, RiBookmarkFill } from 'react-icons/ri';
import { BsShieldShaded } from 'react-icons/bs';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { UserRoles } from '@typescript/index';

const BASE_CLASSNAME = 'h-7 w-7';

export interface IHeaderLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  publicLink?: Boolean;
  role?: UserRoles;
  activeOnRootPathName?: boolean;
}

const Header = () => {
  const isDesktop = useMediaQuery({ minWidth: 600 });
  const { data: user } = useMeQuery();

  const nav: IHeaderLink[] = [
    {
      label: 'Home',
      href: '/home',
      icon: <AiFillHome className={BASE_CLASSNAME} />,
    },
    {
      label: 'Explore',
      href: '/explore',
      icon: <RiCodeLine className={BASE_CLASSNAME} />,
      publicLink: true,
    },
    // {
    //   label: 'Notifications',
    //   href: '/notifications',
    //   icon: <IoIosNotifications className={BASE_CLASSNAME} />,
    // },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      icon: <RiBookmarkFill className={BASE_CLASSNAME} />,
    },
    // {
    //   label: 'Messages',
    //   href: '/messages',
    //   icon: <RiMessage2Fill className={BASE_CLASSNAME} />,
    // },
    {
      label: 'Profile',
      href: `/${user?.me.username}`,
      icon: <FaUser className={BASE_CLASSNAME} />,
      activeOnRootPathName: true,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <MdSettings className={BASE_CLASSNAME} />,
      activeOnRootPathName: true,
    },
    {
      label: 'Admin',
      href: '/admin',
      icon: <BsShieldShaded className={BASE_CLASSNAME} />,
      activeOnRootPathName: true,
      role: UserRoles.Admin,
    },
  ];

  return (
    <>
      {isDesktop ? <DesktopHeader links={nav} /> : <MobileHeader links={nav} />}
    </>
  );
};

export default Header;
