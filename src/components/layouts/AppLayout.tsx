import Link from '@components/elements/link/Link';
import PageHeading from '@components/elements/pageHeading/PageHeading';
import Header from '@components/modules/Header/Header';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import MediaQuery from 'react-responsive';
import { splitURL } from '../../helpers/index';

interface AppLayoutProps {
  children: React.ReactNode;
  settingLayout?: boolean;
  // noAside?: boolean;
  onlyHeader?: boolean;
  withTabs?: boolean;
  tabs?: { label: string; href: string }[];
}

const AppLayout = ({ children, tabs, onlyHeader }: AppLayoutProps) => {
  const router = useRouter();

  const currentRootPathname = splitURL(router.pathname)[0];

  useEffect(() => {
    console.log('layoutzzzz moubnt');
  }, []);
  return (
    <div className="min-h-screen flex justify-center mx-auto max-w-[1224px]">
      <Header />
      {!onlyHeader ? (
        <>
          <div className="w-[600px] max-w-[600px] border-x">
            <PageHeading title={currentRootPathname} />
            {children}
          </div>

          <MediaQuery minWidth={1024}>
            <div className="bg-slate-300 flex-grow">Aside</div>
          </MediaQuery>
        </>
      ) : (
        <div className="flex-grow flex">
          <div className="max-w-sm w-96 border-x">
            <PageHeading title={currentRootPathname} />
            <ul>
              {tabs?.map(({ label, href }) => {
                return (
                  <li>
                    <Link
                      className="flex box-border border-r-2  justify-between items-center px-4 py-6 text-sm hover:bg-gray-100"
                      notActiveClassName="border-transparent"
                      activeClassName="border-primary"
                      href={href}
                    >
                      <span>{label}</span>
                      <BsChevronRight />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex-grow">{children}</div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
