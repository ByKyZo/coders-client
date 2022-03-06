import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAccess from 'hoc/withAccess';
import React from 'react';

const Explore: NextComponent = (props: any) => {
  console.log('Ecplorre page props : ', props);

  return <div className="w-full">Explore</div>;
};

const ExploreWithPublic = withAccess(Explore, { accessType: 'public' });
// const ExploreWithPublic = withAuth(Explore);

ExploreWithPublic.getLayout = (page: React.Component) => {
  console.log('Explore Get layout page : ', page);
  return <AppLayout>{page}</AppLayout>;
};

export default ExploreWithPublic;
