import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Notifications: NextComponent = () => {
  return <div></div>;
};

Notifications.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default withAuth(Notifications);
