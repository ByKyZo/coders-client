import { getSettingsLayout } from '@components/layouts/SettingsLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Settings: NextComponent = () => {
  console.log('Settings mount');

  return <></>;
};

const SettingsWithAuth = withAuth(Settings);

SettingsWithAuth.getLayout = getSettingsLayout;

export default SettingsWithAuth;
