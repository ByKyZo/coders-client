import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Bookmarks: NextComponent = () => {
  return <div></div>;
};

const BookmarksWithAuth = withAuth(Bookmarks);

BookmarksWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default BookmarksWithAuth;
