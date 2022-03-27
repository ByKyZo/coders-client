import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Messages: NextComponent = () => {
  return <div></div>;
};

const MessagesWithAuth = withAuth(Messages);

MessagesWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default MessagesWithAuth;
