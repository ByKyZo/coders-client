import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAccess from 'hoc/withAccess';
import React from 'react';

const Explore: NextComponent = (props: any) => {
  console.log('Ecplorre page props : ', props);

  return <div className="w-full">Explore</div>;
};
// const ExploreWithAuth = withAuth(Explore);
// ExploreWithAuth.getLayout = (page: any) => {
//   return <AppLayout>{page}</AppLayout>;
// };

// export default ExploreWithAuth;
// const ExploreWithPublic = withPublic(Explore);

const ExploreWithPublic = withAccess(Explore, { accessType: 'public' });

ExploreWithPublic.getLayout = (page: React.Component) => {
  console.log('Explore Get layout page : ', page);
  return <AppLayout>{page}</AppLayout>;
};

export default ExploreWithPublic;

// Explore.getLayout = (page: any) => {
//   return <AppLayout>{page}</AppLayout>;
// };

// export default Explore;
