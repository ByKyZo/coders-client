import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';

const Profile: NextComponent = () => {
  return <div></div>;
};

const ProfileWithAuth = withAuth(Profile);

ProfileWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ProfileWithAuth;
