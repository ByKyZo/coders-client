import AppLayout from '@components/layouts/AppLayout';
import React from 'react';
import { NextComponent } from '../types/index';

const Bookmarks: NextComponent = () => {
  return <div>Bookmarks</div>;
};

Bookmarks.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Bookmarks;
