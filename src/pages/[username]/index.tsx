import { getProfileLayout } from '@components/layouts/ProfileLayout';
import { UserDocument } from '@graphql/users/get-user/index.generated';
import withAuth from 'hoc/withAuth';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import client from '../../apollo-client';
import { UserQuery } from '../../graphql/users/get-user/index.generated';
import { NextComponent } from '../../typescript/index';

interface ProfileProps {
  data: UserQuery;
  error: any;
}

const Profile: NextComponent<ProfileProps> = ({ data, error }) => {
  const router = useRouter();
  // const { data } = useUserQuery({
  //   variables: {
  //     username: router.query.username as string,
  //   },
  // });

  console.log('SSR Data : ', data?.user);
  console.log('SSR Error : ', error);

  // console.log(router.query);

  return (
    <div>
      {/* <ProfileHeader user={data}></ProfileHeader> */}
      Tweets
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { data } = await client.query({
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
  // console.log(context.query.username);

  // const client = initializeApollo({})
  // // await getDataFromTree(SsrPage) (not working: see bug report)
  // const query1 = await client.query({query: ComplaintsQuery})
  // const query2 = await client.query({query: TrendingComplaintsQuery})

  // const {locale} = context
  // const documentProps = addApolloState(client, {
  //     props: {...(await serverSideTranslations(locale, ['header', 'complaintList', 'footer']))},
  // })

  // Will be passed to the page component as props
}

const ProfileWithAuth = withAuth(Profile);

ProfileWithAuth.getLayout = getProfileLayout;

export default ProfileWithAuth;
