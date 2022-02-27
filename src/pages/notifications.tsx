import AppLayout from '@components/layouts/AppLayout';
import React from 'react';
import { NextComponent } from '../types/index';

const Notifications: NextComponent = () => {
  return <div>Notifications</div>;
};

Notifications.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Notifications;
