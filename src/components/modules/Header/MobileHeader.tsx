import Link from '@components/elements/link/Link';
import React, { useEffect, useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { RiBookmarkFill, RiCodeLine } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';

const MobileHeader = () => {
  const baseClassName = 'h-7 w-7';

  const headerRef = useRef<HTMLDivElement>(null);

  const { data: user } = useMeQuery();

  const isLaptop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    document.body.style.paddingBottom = `${headerRef.current?.clientHeight}px`;
    return () => {
      document.body.style.paddingBottom = '0px';
    };
  }, []);

  const nav = [
    {
      label: 'Home',
      href: '/home',
      icon: <AiFillHome className={baseClassName} />,
    },
    {
      label: 'Explore',
      href: '/explore',
      icon: <RiCodeLine className={baseClassName} />,
      publicLink: true,
    },
    // {
    //   label: 'Notifications',
    //   href: '/notifications',
    //   icon: <IoIosNotifications className={baseClassName} />,
    // },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      icon: <RiBookmarkFill className={baseClassName} />,
    },
    {
      label: 'Profile',
      href: `/${user?.me.username}`,
      icon: <FaUser className={baseClassName} />,
      activeOnRootPathName: true,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <MdSettings className={baseClassName} />,
      activeOnRootPathName: true,
    },
  ];

  return (
    <>
      <div ref={headerRef} className="fixed w-full bg-white bottom-0 z-[999]">
        <header className="px-2">
          <nav className="h-full ">
            <ul className="flex justify-between">
              {nav.map(
                ({ label, href, icon, activeOnRootPathName, publicLink }) => {
                  if (!user && !publicLink) return null;
                  return (
                    <li className="flex" key={uuidv4()}>
                      <Link
                        activeOnRootPathName={activeOnRootPathName}
                        className="flex items-center px-3 py-4 text-xl transition-colors duration-300 hover:bg-gray-50"
                        notActiveClassName="text-gray-800"
                        activeClassName="text-gray-900 text-bold font-semibold "
                        href={href}
                      >
                        <span>{icon}</span>
                        {isLaptop && <span className="ml-4">{label}</span>}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};

export default MobileHeader;
