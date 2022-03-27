import Link from '@components/elements/link/Link';
import Profile from '@components/modules/profile/Profile';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import ProfileMenu from '../dropdown/my-profile/MyProfileMenu';
import { IHeaderLink } from '@components/modules/Header/Header';
import { UserRoles } from '@typescript/index';
import { hasAccess } from '../../../helpers/index';

interface IDesktopHeaderProps {
  links: IHeaderLink[];
}

const DesktopHeader = ({ links }: IDesktopHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerWidth, setHeaderWidth] = useState<number>(0);

  const { data: user } = useMeQuery();

  const isLaptop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    const handleResize = () => {
      if (!headerRef.current) return;
      const bounds = headerRef.current.getBoundingClientRect();
      setHeaderWidth(bounds.width);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative flex justify-end">
        <div
          className="relative flex justify-end"
          style={{ width: headerWidth }}
        />

        <div ref={headerRef} className="top fixed top-0 h-screen">
          <header className="h-full pt-4 pb-8 px-2 flex justify-end">
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
                <nav>
                  <ul>
                    {links.map(
                      ({
                        label,
                        href,
                        icon,
                        activeOnRootPathName,
                        publicLink,
                        role,
                      }) => {
                        if (!user && !publicLink) return null;
                        if (role && !hasAccess(user?.me?.roles!, role)) return;

                        return (
                          <li className="flex" key={uuidv4()}>
                            <Link
                              activeOnRootPathName={activeOnRootPathName}
                              className="flex items-center px-6 py-4 text-xl transition-colors duration-300 hover:bg-gray-50 w-full rounded-full"
                              notActiveClassName="text-gray-800"
                              activeClassName="text-gray-900 text-bold font-semibold "
                              href={href}
                            >
                              <span>{icon}</span>
                              {isLaptop && (
                                <span className="ml-4">{label}</span>
                              )}
                            </Link>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </nav>
                {user && (
                  <ProfileMenu
                    menuButton={
                      <button className="px-3">
                        <Profile
                          avatar={user?.me.profile.profilePicture!}
                          username={user?.me.username}
                          displayname={user?.me.profile.displayname!}
                          avatarOnly={!isLaptop}
                          withMenuIcon
                        />
                      </button>
                    }
                  />
                )}
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default DesktopHeader;
