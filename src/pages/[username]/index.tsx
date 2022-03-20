import { getProfileLayout } from '@components/layouts/ProfileLayout';
import { UserDocument } from '@graphql/queries/get-user/index.generated';
import withAccess from '@hoc/withAccess';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { initializeApollo } from '../../apollo-client';
import { UserQuery } from '@graphql/queries/get-user/index.generated';
import { NextComponent } from '@typescript/index';
interface TweetsProps {
  data: UserQuery;
  error: any;
}

const Tweets: NextComponent<TweetsProps> = ({ data, error }) => {
  const router = useRouter();

  console.log('SSR Data : ', data?.user);
  console.log('SSR Error : ', error);

  return <div>Tweets</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = initializeApollo(null, context);

  try {
    const { data } = await apolloClient.query({
      query: UserDocument,
      variables: {
        username: context.query.username,
      },
    });
    return {
      props: {
        data: data,
      },
    };
  } catch (err: any) {
    return {
      props: {
        error: err.message,
      },
    };
  }
}

const TweetsWithAuth = withAccess<NextComponent>(Tweets, {
  accessType: 'public',
});

TweetsWithAuth.getLayout = getProfileLayout;

export default TweetsWithAuth;

// TweetsWithAuth.getLayout = getProfileLayout;

// export default TweetsWithAuth;
