import Link from '@components/elements/link/Link';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { MdSettings } from 'react-icons/md';
import { RiBookmarkFill, RiCodeLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const baseClassName = 'h-7 w-7';
  const activeClassName = 'text-primary';

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
      label: 'Profile',
      href: '/profile',
      icon: <FaUser className={baseClassName} />,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <MdSettings className={baseClassName} />,
    },
  ];

  return (
    <header className="pt-4 pb-8 px-2 flex flex-growS  justify-end bg-red-3s00">
      <div className="w-56 flex flex-col">
        <div className="pl-3 flex items-center">
          {/* prettier-ignore */}
          <svg className="h-8 w-8 fill-blue" viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.8372 0L79.6743 69H0L39.8372 0Z" fill="#BD00FF"/>
            <path d="M40 20L63 60H17L40 20Z" fill="white" fillOpacity="0.7"/>
            <path d="M40 26L58 57H22L40 26Z" fill="white"/>
          </svg>
        </div>
        <div className="h-full flex flex-col justify-between">
          <nav>
            <ul>
              {nav.map(({ label, href, icon }) => {
                return (
                  <li key={uuidv4()} className="">
                    <Link
                      className="font-sans-s2 flex items-center px-3 py-4 text-xl transition-colors duration-300 hover:bg-slate-100"
                      notActiveClassName="text-slate-500"
                      activeClassName="text-slate-900 text-bold font-semibold"
                      href={href}
                    >
                      <span>{icon}</span>
                      <span className="ml-4">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="px-1 flex">
            <img
              className="h-10 w-10 rounded-full"
              src="https://picsum.photos/200/300"
              alt="picture"
            />
            <div className="ml-3 flex flex-col leading-5">
              <span className="font-bold text-gray-800">KyZo</span>
              <span>
                <span className="text-gray-400">@</span>
                <span className="text-sm text-gray-400">Id_KyZo</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
