import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Bookmarks: NextComponent = () => {
  return <div></div>;
};

Bookmarks.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default withAuth(Bookmarks);
