import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Notifications: NextComponent = () => {
  return <div></div>;
};

const NotificationsWithAuth = withAuth(Notifications);

NotificationsWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default NotificationsWithAuth;
