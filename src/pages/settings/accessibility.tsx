import Heading from '@components/elements/heading/Heading';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { getSettingsLayout } from '../../components/layouts/SettingsLayout';

const Accessibility: NextComponent = () => {
  const isBreakPoint = useMediaQuery({ minWidth: 1024 });

  return (
    <div>
      <Heading withGoBack={!isBreakPoint} noBorder title="Accessibility" />
    </div>
  );
};

const AccessibilityWithAuth = withAuth(Accessibility);

AccessibilityWithAuth.getLayout = getSettingsLayout;

export default AccessibilityWithAuth;
