import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Notifications: NextComponent = () => {
  return <div></div>;
};

const NotificationsWithAuth = withAuth(Notifications);

NotificationsWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default NotificationsWithAuth;
