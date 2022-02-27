import AppLayout from '@components/layouts/AppLayout';
import React from 'react';
import { NextComponent } from '../types/index';

const Settings: NextComponent = () => {
  return <div>Settings</div>;
};

Settings.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Settings;
