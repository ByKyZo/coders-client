import Link from '@components/elements/link/Link';
import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { IHeaderLink } from '@components/modules/Header/Header';
import { hasAccess } from '@helpers/index';

interface IMobileHeaderProps {
  links: IHeaderLink[];
}

const MobileHeader = ({ links }: IMobileHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const { data: user } = useMeQuery();

  const isLaptop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    document.body.style.paddingBottom = `${headerRef.current?.clientHeight}px`;
    return () => {
      document.body.style.paddingBottom = '0px';
    };
  }, []);

  return (
    <>
      <div ref={headerRef} className="fixed w-full bg-white bottom-0 z-[999]">
        <header className="px-2">
          <nav className="h-full ">
            <ul className="flex justify-between">
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
