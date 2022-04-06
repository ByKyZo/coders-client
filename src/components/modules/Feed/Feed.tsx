import Post from '@components/modules/Post/Post';
import React, { useEffect, useState } from 'react';
import { useFeedQuery } from '@graphql/queries/get-feed/index.generated';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toastError } from '@helpers/index';
import { useTriggerScrollFix } from '@hooks/useTriggerScrollFix';
import Loader from '@components/elements/loader/Loader';
import { FeedOptions } from '@graphql/queries/get-feed/index.generated';

interface IFeedProps {
  options?: FeedOptions;
}

const Feed = ({ options }: IFeedProps) => {
  const {
    data: feed,
    fetchMore,
    refetch,
  } = useFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        page: 0,
        take: 10,
        options: {
          ...options,
          // excludeFollowing: true,
        },
      },
    },
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          input: {
            page: page,
            take: 10,
            options: {
              ...options,
            },
          },
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
          // fetchMoreResult.feed.list = [...lastEntries, ...prevEntries];
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

  // NOTE : Pourquoi j'ai besoin de reftch pour que ça fonctionne ?
  useEffect(() => {
    refetch();
  }, []);

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
              // @ts-ignore
              post={post}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
