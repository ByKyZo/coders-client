import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = () => {
  const isDesktop = useMediaQuery({ minWidth: 600 });

  return <>{isDesktop ? <DesktopHeader /> : <MobileHeader />}</>;
};

export default Header;
