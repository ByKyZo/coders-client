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

  return (
    // <div className="min-h-screen flex justify-center mx-auto max-w-[1224px]">
    // <div className="min-h-screen flex mx-auto justify-center max-w-7xl">
    <div className="min-h-screen flex mx-auto justify-center max-w-[1224px]">
      {/* <div className="flex-grow relative"> */}
      {/* <div className="flex-grow relative"> */}
      {/* <div className="relative flex justify-end flex-gsrow"> */}
      <Header />
      {/* </div> */}
      {/* <div className="w-[600px] max-w-[600px] border-x">
              <Heading title={currentRootPathname} />
              {children}
            </div>

            <MediaQuery minWidth={1024}>
              <div className="bg-slate-300 w-[300px] max-w-[300px] flex-grow">
                Aside
              </div>
            </MediaQuery> */}

      <main className="flex justify-center w-full md:w-auto">
        {/* <main className="flex max-w-[700px]"> */}
        {/* <main className="flex justify-start flex-grow flex-shrink"> */}
        {/* <main className="flex justify-center flex-grow flex-shrink"> */}
        {/* <main className="flex justify-start flex-shrink"> */}
        {!onlyHeader ? (
          <>
            <div className="w-full max-w-none md:w-[600px] md:max-w-[600px] border-x">
              <Heading title={currentRootPathname} />
              {children}
            </div>

            <MediaQuery minWidth={1024}>
              <div className=" py-16">
                <div className="bg-slate-300 w-[300px] max-w-[300px] flex-grow sticky top-0 bottom-0">
                  Aside
                  <div className="h-52 bg-yellow-200 mb-2"></div>
                  <div className="h-52 bg-yellow-200 mb-2"></div>
                  {/* <div className="h-52 bg-yellow-200 mb-2"></div> */}
                  {/* <div className="h-52 bg-yellow-200 mb-2"></div> */}
                  {/* <div className="h-52 bg-yellow-200 mb-2"></div> */}
                  {/* <div className="h-52 bg-yellow-200 mb-2"></div> */}
                </div>
              </div>
            </MediaQuery>

            {/* <div className="w-[600px] max-w-[600px] border-x"> */}
            {/* <div className="flex-grow w- max-w-[600px] border-x"> */}
            {/* <div className="flex-grow max-w-[600px] border-x"> */}
            {/* <div className="w-2/3 max-w-[600px] w-[600px] border-x"> */}
            {/* <div className="w-full max-w-[600px] border-x"> */}

            {/* <div className="flex flex-col w-[600px] max-w-[600px] border-x">
              <Heading title={currentRootPathname} />
              {children}
            </div> */}

            {/* <MediaQuery minWidth={1024}> */}
            {/* <div className="bg-slate-300 flex-grow max-w-384">Aside</div> */}
            {/* <div className="bg-slate-300 flex-grow max-w-384">Aside</div> */}
            {/* <div className="bg-yellow-600 lg:max-w-sm lg:w-96 w-[600px] max-w-[600px] border-x"> */}
            {/* <div className="flex-grow border-x">Aside</div> */}
            {/* <div className="bg-yellow-600 flex-grow lg:max-w-sm lg:w-96 w-[380px] max-w-[380px] border-x"> */}
            {/* <div className="bg-yellow-600 lg:max-w-sm lg:w-96 w-[380px] max-w-[380px] border-x"> */}
            {/* <div className="bg-yellow-600 lg:max-w-sm lg:w-96 border-x">
                Aside
              </div> */}
            {/* <div className="bg-yellow-600  w-1/3 border-x">Aside</div> */}
            {/* </MediaQuery> */}
          </>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default AppLayout;
