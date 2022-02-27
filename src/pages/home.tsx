import AppLayout from '@components/layouts/AppLayout';
import React from 'react';
import { NextComponent } from '../types/index';

const Home: NextComponent = () => {
  return <div>home</div>;
};

Home.getLayout = (page) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;
