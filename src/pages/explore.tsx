import AppLayout from '@components/layouts/AppLayout';
import Feed from '@components/modules/Feed/Feed';
import { NextComponent } from '@typescript/index';
import withAccess from 'hoc/withAccess';
import React from 'react';

const Explore: NextComponent = (props: any) => {
  return (
    <div className="w-full">
      <Feed
        options={{
          excludeFollowing: true,
        }}
      />
    </div>
  );
};

const ExploreWithPublic = withAccess<NextComponent>(Explore, {
  accessType: 'public',
});

ExploreWithPublic.getLayout = (page: React.Component) => {
  return <AppLayout>{page}</AppLayout>;
};

export default ExploreWithPublic;
