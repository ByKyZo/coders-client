import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAccess from 'hoc/withAccess';
import React from 'react';

const Explore: NextComponent = (props: any) => {
  return <div className="w-full">Explore</div>;
};

const ExploreWithPublic = withAccess<NextComponent>(Explore, {
  accessType: 'public',
});

ExploreWithPublic.getLayout = (page: React.Component) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ExploreWithPublic;
