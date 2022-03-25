import Post from '@components/modules/Post/Post';
import { NextComponent } from '@typescript/index';
import React, { useEffect, useState } from 'react';
import { useFeedQuery } from '@graphql/queries/get-feed/index.generated';
import InfiniteScroll from 'react-infinite-scroll-component';
import { isEmpty, toastError } from '@helpers/index';
import { useRouter } from 'next/router';
import { useFollowingsQuery } from '@graphql/queries/get-followings/index.generated';
import { useTriggerScrollFix } from '@hooks/useTriggerScrollFix';
import Loader from '@components/elements/loader/Loader';

const Feed: NextComponent = () => {
  const { data: feed, fetchMore } = useFeedQuery({
    variables: {
      input: { page: 0 },
    },
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          input: { page: page, take: 10 },
        },

        /**
         * NOTE : Utiliser la fonction merge dans la config du cache apollo plutôt que la 'updateQuery' de la fonction fetchmore
         */
        updateQuery: (prevResult, { fetchMoreResult }) => {
          setPage((old) => old + 1);

          if (!fetchMoreResult?.feed) {
            return prevResult;
          }

          const prevEntries = prevResult?.feed?.list || [];
          const lastEntries = fetchMoreResult?.feed?.list || [];

          fetchMoreResult.feed.list = [...prevEntries, ...lastEntries];

          return { ...fetchMoreResult };
        },
      });
      if (data.feed.list.length >= data.feed.total) {
        setHasMore(false);
      }
    } catch (err: any) {
      toastError(err.message);
    }
  };

  useTriggerScrollFix([feed?.feed.list.length]);

  return (
    <div>
      <InfiniteScroll
        dataLength={feed?.feed.list.length || 0}
        hasMore={hasMore}
        next={handleLoadMore}
        loader={
          <Loader
            strokeWidth={2}
            className="text-primary h-12 w-12 mt-4 mb-12 mx-auto"
          />
        }
      >
        {feed?.feed.list.map((post) => {
          return (
            <Post
              key={post.id}
              context="display"
              raw={JSON.parse(post.draftRaw!)}
              withFollow
              postId={post.id}
              authorId={post.author.id}
              authorUsername={post.author.username}
              authorDisplayname={post.author.profile.displayname!}
              authorAvatar={post.author.profile.profilePicture!}
              authorMedias={post.medias}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
