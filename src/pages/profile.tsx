import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Profile: NextComponent = () => {
  return <div></div>;
};

Profile.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default withAuth(Profile);
