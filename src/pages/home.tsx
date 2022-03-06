import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Home: NextComponent = () => {
  return (
    <div>
      <div className="h-96 mb-2 bg-red-100"></div>
      <div className="h-96 mb-2 bg-red-100"></div>
      <div className="h-96 mb-2 bg-red-100"></div>
      <div className="h-96 mb-2 bg-red-100"></div>
      <div className="h-96 mb-2 bg-red-100"></div>
      <div className="h-96 mb-2 bg-red-100"></div>
    </div>
  );
};

const HomeWithAuth = withAuth(Home);

HomeWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default HomeWithAuth;
