import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Messages: NextComponent = () => {
  return <div></div>;
};

const MessagesWithAuth = withAuth(Messages);

MessagesWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default MessagesWithAuth;
