import AppLayout from '@components/layouts/AppLayout';
import Feed from '@components/modules/Feed/Feed';
import Post from '@components/modules/Post/Post';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Home: NextComponent = () => {
  return (
    <div>
      <Post context="create" />
      <Feed />
    </div>
  );
};

const HomeWithAuth = withAuth(Home);

HomeWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default HomeWithAuth;
