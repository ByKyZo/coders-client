import Button from '@components/elements/button/Button';
import Heading from '@components/elements/heading/Heading';
import Header from '@components/modules/Header/Header';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { isBrowser, splitURL } from '../../helpers/index';

interface AppLayoutProps {
  children: React.ReactNode;
  onlyHeader?: boolean;
  noHeading?: boolean;
}

const AppLayout = ({
  children,
  noHeading,
  onlyHeader = false,
}: AppLayoutProps) => {
  const router = useRouter();
  const { data: me } = useMeQuery();
  const currentRootPathname = splitURL(router.asPath)[0];

  return (
    <div
      id="app-body"
      className="min-h-screen flex mx-auto justify-center max-w-[1224px]"
    >
      <Header />
      <main className="flex justify-center w-full md:w-auto">
        {!onlyHeader ? (
          <>
            <div className="w-full max-w-none md:w-[600px] md:max-w-[600px] border-x">
              {!noHeading && <Heading title={currentRootPathname} />}
              {children}
            </div>
            {/* {renderToString( */}
            {/* <ResponsiveContext.Provider value={{ minWidth: 1024 }}> */}
            <MediaQuery minWidth={1024}>
              <div className="py-16">
                <div className=" w-[300px] max-w-[300px] sticky top-0 bottom-0 border border-l-0">
                  Aside
                  <div className="h-52 bg-white mb-2"></div>
                  <div className="h-52 bg-white mb-2"></div>
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
      {!me && (
        <div className="bg-white  border-t fixed bottom-0 w-full py-12 flex justify-center items-center z-50">
          <Button
            className="mr-4"
            as="link"
            href="/auth/login"
            styleType="primaryOutline"
            sizeType="large"
          >
            Login
          </Button>
          <Button
            as="link"
            href="/auth/signup"
            styleType="primary"
            sizeType="large"
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
