import TabItem from '@components/lib/Tabs/TabItem';
import Tabs from '@components/lib/Tabs/Tabs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { isBrowser } from '../../helpers/index';
import AppLayout from './AppLayout';
interface SettingsLayoutProps {
  children: React.Component;
}

// ! Finir la view du tabs
// ! Finir la view du tabs
// ! Finir la view du tabs
// ! Finir la view du tabs
// ! Finir la view du tabs

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const router = useRouter();

  const isBreakPoint = useMediaQuery({ minWidth: 1024 });

  const isRootPath = router.pathname === '/settings';

  useEffect(() => {
    if (isBreakPoint) {
      router.push('/settings/account');
    }
  }, [isBreakPoint]);

  if (!isBrowser) return null;

  return (
    <>
      <Tabs>
        <TabItem label={'Account'} href={'/settings/account'} />
        <TabItem label={'Accessibility'} href={'/settings/accessibility'} />
      </Tabs>

      {(!isRootPath || isBreakPoint) && (
        <div className="w-full max-w-none md:w-[600px] md:max-w-[600px] border-x lg:border-l-0">
          {children}
        </div>
      )}
    </>
  );
};

export const getSettingsLayout = (page: React.Component) => {
  return (
    <AppLayout onlyHeader>
      <SettingsLayout>{page}</SettingsLayout>
    </AppLayout>
  );
};

export default SettingsLayout;
