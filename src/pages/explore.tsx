import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Explore: NextComponent = () => {
  return <div className="w-full"></div>;
};

Explore.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default withAuth(Explore);
