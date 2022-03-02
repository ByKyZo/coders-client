import React from 'react';

interface TabsLayoutProps {
  children: JSX.Element;
}

const TabsLayout = ({ children }: TabsLayoutProps) => {
  return (
    <div className="flex-grow border-x">
      {/* <PageHeading title={currentRootPathname} /> */}
      {children}
    </div>
  );
};

export default TabsLayout;
