import Heading from '@components/elements/heading/Heading';
import { splitURL } from '@helpers/index';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface TabsProps {
  children: JSX.Element | ReactNode;
}

const Tabs = ({ children }: TabsProps) => {
  const router = useRouter();

  const currPathname = splitURL(router.pathname)[0];

  const isBreakPoint = useMediaQuery({ minWidth: 1024 });

  const isRootPath = router.pathname === '/settings';

  return (
    <>
      {(isRootPath || isBreakPoint) && (
        <div
          className={`md:w-[600px] lg:w-[300px] lg:max-w-[300px] w-full max-w-none border-x`}
        >
          <Heading title={currPathname} />
          <ul>{children}</ul>
        </div>
      )}
    </>
  );
};

export default Tabs;
