import AppLayout from '@components/layouts/AppLayout';
import CreatePost from '@components/modules/CreatePost/CreatePost';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React, { useEffect } from 'react';

const Home: NextComponent = () => {
  return (
    <div>
      <CreatePost />
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
