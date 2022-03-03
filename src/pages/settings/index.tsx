import { NextComponent } from '@types/index';
import withAuth from 'hoc/withAuth';
import React from 'react';
import SettingsLayout from '../../components/layouts/SettingsLayout';

const Settings: NextComponent = () => {
  console.log('Settings mount');

  return (
    // <div>
    // {/* <nav className="w-96 border-r">
    //   <ul>
    //     <SubNavItem href="/settings/account" label="Account" />
    //     <SubNavItem href="/settings/accessibility" label="Accessibility" />
    //   </ul>
    // </nav> */}
    // </div>
    <></>
  );
};

const SettingsWithAuth = withAuth(Settings);

SettingsWithAuth.getLayout = (page: any) => {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default SettingsWithAuth;
