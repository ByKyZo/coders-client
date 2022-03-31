import AppLayout from '@components/layouts/AppLayout';
import { NextComponent } from '@typescript/index';
import withAuth from 'hoc/withAuth';
import React from 'react';
import { useGetSavedPostQuery } from '../graphql/queries/get-saved-post/index.generated';
import { useMeQuery } from '../graphql/queries/get-me/index.generated';
import Post from '@components/modules/Post/Post';

const Bookmarks: NextComponent = () => {
  const { data: me } = useMeQuery();
  const { data: savedPost } = useGetSavedPostQuery({
    variables: {
      username: me?.me.username!,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      {!savedPost?.user.savedPost.list.length ? (
        <h2 className="text-center py-6 text-2xl">You don't have bookmarks</h2>
      ) : (
        savedPost?.user.savedPost.list.map((post, i) => {
          return (
            <Post
              context="display"
              key={i}
              // @ts-ignore
              post={post.post!}
              // @ts-ignore
              raw={JSON.parse(post.post.draftRaw)}
            />
          );
        })
      )}
    </>
  );
};

const BookmarksWithAuth = withAuth(Bookmarks);

BookmarksWithAuth.getLayout = (page: any) => {
  return <AppLayout>{page}</AppLayout>;
};

export default BookmarksWithAuth;
