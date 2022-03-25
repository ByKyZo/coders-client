import { getProfileLayout } from '@components/layouts/ProfileLayout';
import { UserDocument } from '@graphql/queries/get-user/index.generated';
import withAccess from '@hoc/withAccess';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { initializeApollo } from '../../apollo-client';
import { UserQuery } from '@graphql/queries/get-user/index.generated';
import { NextComponent } from '@typescript/index';
import { usePostsQuery } from '@graphql/queries/get-posts/index.generated';
import Post from '@components/modules/Post/Post';
interface TweetsProps {
  data: UserQuery;
  error: any;
}

const Tweets: NextComponent<TweetsProps> = ({ data, error }) => {
  const router = useRouter();
  const { data: postsQueryData } = usePostsQuery({
    variables: {
      username: router.query.username as string,
    },
  });

  const posts = postsQueryData?.user.posts;

  return (
    <div>
      {posts?.list.map((post) => {
        if (post.draftRaw) {
          return (
            <Post
              key={post.id}
              context="display"
              raw={JSON.parse(post.draftRaw)}
              postId={post.id}
              authorUsername={post.author.username}
              authorDisplayname={post.author.profile.displayname!}
              authorAvatar={post.author.profile.profilePicture!}
              authorMedias={post.medias}
            />
          );
        }
      })}
    </div>
  );
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
