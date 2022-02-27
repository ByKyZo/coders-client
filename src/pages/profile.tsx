import AppLayout from '@components/layouts/AppLayout';
import React from 'react';
import { NextComponent } from '../types/index';

const Profile: NextComponent = () => {
  return <div>Profile</div>;
};

Profile.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Profile;
