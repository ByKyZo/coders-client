import Header from '@components/modules/Header/Header';
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    // <div className="m max-w max-w-5xl flex">
    <div className="min-h-screen max-w w-min flex mx-auto">
      <Header />
      <div className="flex">
        <div className="bg-blue-300 flex-grows w-[600px] max-w-[600px]">
          {children}
        </div>
        <div className="bg-slate-300  w-96">Aside</div>
      </div>
    </div>
  );
};

export default AppLayout;
