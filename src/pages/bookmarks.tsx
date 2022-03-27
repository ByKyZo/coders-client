import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Bookmarks: NextComponent = () => {
  return <div></div>;
};

const BookmarksWithAuth = withAuth(Bookmarks);

BookmarksWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default BookmarksWithAuth;
