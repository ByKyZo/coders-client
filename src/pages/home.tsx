import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

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
