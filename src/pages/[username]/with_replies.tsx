import { getProfileLayout } from '@components/layouts/ProfileLayout';
import withAccess from 'hoc/withAccess';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { initializeApollo } from '../../apollo-client';
import {
  UserDocument,
  UserQuery,
} from '@graphql/queries/get-user/index.generated';
import { NextComponent } from '../../typescript/index';

interface TweetsAndRepliesProps {
  data: UserQuery;
  error: any;
}

const TweetsAndReplies: NextComponent<TweetsAndRepliesProps> = ({
  data,
  error,
}) => {
  const router = useRouter();

  console.log('SSR Data : ', data?.user);
  console.log('SSR Error : ', error);

  return <div>TweetsAndReplies & replies</div>;
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

const TweetsAndRepliesWithAuth = withAccess<NextComponent>(TweetsAndReplies, {
  accessType: 'public',
});

TweetsAndRepliesWithAuth.getLayout = getProfileLayout;

export default TweetsAndRepliesWithAuth;

// TweetsAndRepliesWithAuth.getLayout = getProfileLayout;

// export default TweetsAndRepliesWithAuth;
