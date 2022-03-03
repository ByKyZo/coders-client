import Link from '@components/elements/link/Link';
import { isBrowser } from '@helpers/index';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { MdSettings } from 'react-icons/md';
import { RiBookmarkFill, RiCodeLine, RiMessage2Fill } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import Profile from '../../elements/profile/Profile';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Header = () => {
  const baseClassName = 'h-7 w-7';

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerWidth, setHeaderWith] = useState<number>(0);

  const isLaptop = useMediaQuery({ minWidth: 1280 });
  // const isLaptop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const handleResize = () => {
      if (!headerRef.current) return;
      const bounds = headerRef.current.getBoundingClientRect();
      setHeaderWith(bounds.width);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: <IoIosNotifications className={baseClassName} />,
    },
    {
      label: 'Bookmarks',
      href: '/bookmarks',
      icon: <RiBookmarkFill className={baseClassName} />,
    },
    {
      label: 'Messages',
      href: '/messages',
      icon: <RiMessage2Fill className={baseClassName} />,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <FaUser className={baseClassName} />,
    },
    {
      label: 'Settings',
      // href: '/settings/account',
      href: '/settings',
      icon: <MdSettings className={baseClassName} />,
      activeOnRootPathName: true,
    },
  ];

  return (
    <>
      <div className="relative flex justify-end">
        <div
          className="relative flex justify-end"
          style={{ width: headerWidth }}
        ></div>
        {/* <div
        className="flex-grow"
        // style={{ width: headerRef.current?.clientWidth }}
      ></div> */}
        <div ref={headerRef} className="top fixed top-0 h-screen">
          <header
            // className="top pt-4 pb-8 px-2 flex justify-end absolute top-0 h-screen"
            // className="top pt-4 pb-8 px-2 flex justify-end fixed top-0 h-screen"
            className="h-full pt-4 pb-8 px-2 flex justify-end"
          >
            <div className="w-auto flex flex-col xl:w-56">
              <div className="pl-3 flex items-center mb-4">
                {/* prettier-ignore */}
                <svg className="h-8 w-8 fill-blue" viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.8372 0L79.6743 69H0L39.8372 0Z" fill="#BD00FF"/>
            <path d="M40 20L63 60H17L40 20Z" fill="white" fillOpacity="0.7"/>
            <path d="M40 26L58 57H22L40 26Z" fill="white"/>
          </svg>
              </div>
              <div className="h-full flex flex-col justify-between">
                <nav className="">
                  <ul>
                    {nav.map(({ label, href, icon, activeOnRootPathName }) => {
                      return (
                        <li key={uuidv4()} className="">
                          <Link
                            activeOnRootPathName={activeOnRootPathName}
                            className="font-sans-s2 flex items-center px-3 py-4 text-xl transition-colors duration-300 hover:bg-gray-50"
                            notActiveClassName=" text-gray-500"
                            activeClassName=" text-gray-900 text-bold font-semibold "
                            href={href}
                          >
                            <span>{icon}</span>
                            {isBrowser && isLaptop && (
                              <span className="ml-4">{label}</span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
                <ProfileMenu
                  menuButton={
                    <button>
                      <Profile avatarOnly={!isLaptop} />
                    </button>
                  }
                />
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
