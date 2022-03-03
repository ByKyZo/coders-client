import Heading from '@components/elements/heading/Heading';
import Link from '@components/elements/link/Link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';
import { splitURL } from '../../helpers/index';
import AppLayout from './AppLayout';

interface SettingsLayoutProps {
  children: JSX.Element;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const router = useRouter();

  const currPathname = splitURL(router.pathname)[0];

  const isBreakPoint = useMediaQuery({ minWidth: 1024 });

  const isRootPath = router.pathname === '/settings';

  useEffect(() => {
    console.log('befor ebreakpoint');
    if (isBreakPoint) {
      console.log('breakpoint');

      router.push('/settings/account');
    }
  }, [isBreakPoint]);

  useEffect(() => {
    console.log('Settings layout mount');
    return () => {
      console.log('Settings layout unmount');
    };
  }, []);

  const settingsTabs = [
    {
      label: 'Account',
      href: '/settings/account',
    },
    {
      label: 'Accessibility',
      href: '/settings/accessibility',
    },
  ];

  return (
    <>
      <AppLayout onlyHeader>
        {(isRootPath || isBreakPoint) && (
          <div
            // className={`lg:max-w-sm lg:w-96 w-[600px] max-w-[600px] border-x ${
            //   isBreakPoint ? 'border-x' : 'border-r'
            // }`}
            className={`lg:max-w-sm lg:w-96 w-[600px] max-w-[600px] border-x`}
          >
            <Heading title={currPathname} />
            <ul>
              {settingsTabs?.map(({ label, href }, i) => {
                return (
                  <li key={i}>
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
        )}

        {(!isRootPath || isBreakPoint) && (
          <div className="flex-grow w-[600px] max-w-[600px] border-x lg:border-l-0 ">
            {children}
          </div>
        )}
      </AppLayout>
    </>
  );
};

export default SettingsLayout;
