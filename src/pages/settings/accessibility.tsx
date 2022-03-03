import Heading from '@components/elements/heading/Heading';
import SettingsLayout from '@components/layouts/SettingsLayout';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { NextComponent } from '../../types/index';

const Accessibility: NextComponent = () => {
  const isBreakPoint = useMediaQuery({ minWidth: 1024 });

  return (
    <div>
      <Heading withGoBack={!isBreakPoint} noBorder title="Accessibility" />
    </div>
  );
};

Accessibility.getLayout = (page) => {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export default Accessibility;
