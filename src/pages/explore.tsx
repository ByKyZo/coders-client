import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Explore: NextComponent = () => {
  return <div className="w-full">Explore</div>;
};

const ExploreWithAuth = withAuth(Explore);

ExploreWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ExploreWithAuth;
