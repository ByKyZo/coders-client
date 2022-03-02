import SettingsLayout from '@components/layouts/SettingsLayout';
import React from 'react';
import { NextComponent } from '../../types/index';

const Accessibility: NextComponent = () => {
  return <div>Accessibility</div>;
};

Accessibility.getLayout = (page) => {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default Accessibility;
