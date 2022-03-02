import React from 'react';
import AppLayout from './AppLayout';

interface SettingsLayoutProps {
  children: JSX.Element;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <AppLayout
      onlyHeader
      withTabs
      tabs={[
        {
          label: 'Account',
          href: '/settings/account',
        },
        {
          label: 'Accessibility',
          href: '/settings/accessibility',
        },
      ]}
    >
      {children}
    </AppLayout>
  );
};

export default SettingsLayout;
