import SettingsLayout from '@components/layouts/SettingsLayout';
import React from 'react';
import { NextComponent } from '../../types/index';

const Account: NextComponent = () => {
  return <div className="bg-red-300">Account</div>;
};

Account.getLayout = (page) => {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default Account;
