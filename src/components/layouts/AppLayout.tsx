import Heading from '@components/elements/heading/Heading';
import Header from '@components/modules/Header/Header';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { isBrowser, splitURL } from '../../helpers/index';

interface AppLayoutProps {
  children: React.ReactNode;
  onlyHeader?: boolean;
}

const AppLayout = ({ children, onlyHeader = false }: AppLayoutProps) => {
  const router = useRouter();
  const currentRootPathname = splitURL(router.pathname)[0];

  useEffect(() => {
    if (!isBrowser) return;

    document.body.style.overflowY = 'scroll';
    console.log('App layout mount');

    return () => {
      console.log('App layout unmount');
    };
  }, []);

  // if (!user

  return (
    <div className="min-h-screen flex mx-auto justify-center max-w-[1224px]">
      <Header />
      <main className="flex justify-center w-full md:w-auto">
        {!onlyHeader ? (
          <>
            <div className="w-full max-w-none md:w-[600px] md:max-w-[600px] border-x">
              <Heading title={currentRootPathname} />
              {children}
            </div>
            {/* {renderToString( */}
            {/* <ResponsiveContext.Provider value={{ minWidth: 1024 }}> */}
            <MediaQuery minWidth={1024}>
              <div className="py-16">
                <div className="bg-slate-300 w-[300px] max-w-[300px] sticky top-0 bottom-0">
                  Aside
                  <div className="h-52 bg-yellow-200 mb-2"></div>
                  <div className="h-52 bg-yellow-200 mb-2"></div>
                </div>
              </div>
            </MediaQuery>
            {/* </ResponsiveContext.Provider> */}
            {/* )} */}
          </>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default AppLayout;
