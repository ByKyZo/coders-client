import SubNavItem from '@components/elements/sub-nav-item/SubNavItem';
import AppLayout from '@components/layouts/AppLayout';
import TabsLayout from '@components/layouts/TabsLayout';
import { NextComponent } from '@types/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Settings: NextComponent = () => {
  return (
    <div>
      <nav className="w-96 border-r">
        <ul>
          <SubNavItem href="/settings/account" label="Account" />
          <SubNavItem href="/settings/accessibility" label="Accessibility" />
        </ul>
      </nav>
    </div>
  );
};

Settings.getLayout = (page) => {
  return (
    <AppLayout
      onlyHeader
      withTabs
      tabs={[
        {
          label: 'Account',
          href: '/settings/account',
        },
      ]}
    >
      <TabsLayout>{page}</TabsLayout>
    </AppLayout>
  );
};

export default withAuth(Settings);
