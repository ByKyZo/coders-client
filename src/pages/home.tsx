import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Home: NextComponent = () => {
  return <div></div>;
};

Home.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default withAuth(Home);
