import AppLayout from '@components/layouts/AppLayout';
import withAccess from '@hoc/withAccess';
import { useRouter } from 'next/router';
import React from 'react';
import { NextComponent } from '../../../typescript/index';
import { usePostQuery } from '../../../graphql/queries/get-post/index.generated';
import Post from '@components/modules/Post/Post';
import Heading from '@components/elements/heading/Heading';
import { usePostRepliesQuery } from '@graphql/queries/get-post-replies/index.generated';
import Loader from '@components/elements/loader/Loader';

const PostDetail: NextComponent = () => {
  const { postId } = useRouter().query as any;

  const { data: post, loading: loadingPost } = usePostQuery({
    variables: {
      postId: +postId,
    },
  });

  const { data: postWithReplies, loading: loadingReplies } =
    usePostRepliesQuery({
      variables: {
        postId: +postId,
      },
    });

  return (
    <div>
      <Heading title="Tweets" withGoBack />
      {!loadingPost && !loadingReplies ? (
        <>
          <Post
            context="display"
            // @ts-ignore
            raw={post?.post?.draftRaw}
            // @ts-ignore
            post={post?.post!}
          />
          <Post
            context="create"
            editorPlacerholder="Tweet your reply"
            buttonCreateLabel="Reply"
            parentPostId={post?.post.id}
          />
          {postWithReplies?.post.replies.list.map((reply) => {
            return (
              <Post
                key={reply.id}
                context="display"
                // @ts-ignore
                raw={JSON.parse(reply.draftRaw)}
                // @ts-ignore
                post={reply}
              />
            );
          })}
        </>
      ) : (
        <Loader strokeWidth={3} className="h-12 mx-auto mt-4 text-primary" />
      )}
    </div>
  );
};

const PostDetailWithAuth = withAccess<NextComponent>(PostDetail, {
  accessType: 'auth',
});

PostDetailWithAuth.getLayout = (page: any) => {
  return <AppLayout noHeading>{page}</AppLayout>;
};

export default PostDetailWithAuth;
