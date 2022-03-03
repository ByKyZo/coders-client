import AppLayout from '@components/layouts/AppLayout';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { NextComponent } from '../types/index';

const Profile: NextComponent = () => {
  return <div></div>;
};

const ProfileWithAuth = withAuth(Profile);

ProfileWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ProfileWithAuth;
