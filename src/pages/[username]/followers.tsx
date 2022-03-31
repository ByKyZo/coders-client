import React, { useEffect, useState } from 'react';
import { NextComponent } from '@typescript/index';
import FollowLayout from '@components/layouts/FollowLayout';
import AppLayout from '@components/layouts/AppLayout';
import withAccess from '@hoc/withAccess';
import { useRouter } from 'next/router';
import { useFollowersQuery } from '@graphql/queries/get-followers/index.generated';
import Profile from '@components/modules/profile/Profile';
import { isEmpty, toastError } from '@helpers/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@components/elements/loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { useTriggerScrollFix } from '../../hooks/useTriggerScrollFix';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';

/**
 * TODO : Trouver une solution pour le bug de scroll sans bypass avec le hook useTriggerScrollFix()
 * TODO : Créer une logique réutilisable entre les pages : followers / followings
 * TODO : Fix le probleme de loader qui persiste après avoir supprimer un follower ET sur grand écran (car le total des followers ne change pas)
 */

const Followers: NextComponent = () => {
  const router = useRouter();
  const usernameParams = router.query.username as string;
  const [page, setPage] = useState(0);
  const {
    data: followersQueryData,
    fetchMore,
    loading,
  } = useFollowersQuery({
    variables: {
      username: usernameParams,
      input: { page: 0 },
    },
  });
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          username: usernameParams,
          input: { page: page, take: 10 },
        },
        /**
         * NOTE : Utiliser la fonction merge dans la config du cache apollo plutôt que la 'updateQuery' de la fonction fetchmore
         */
        updateQuery: (prevResult, { fetchMoreResult }) => {
          setPage((old) => old + 1);

          if (!fetchMoreResult?.user) {
            return prevResult;
          }

          const prevEntries = prevResult?.user?.followers?.list || [];
          const lastEntries = fetchMoreResult?.user?.followers?.list || [];

          fetchMoreResult.user.followers.list = [
            ...prevEntries,
            ...lastEntries,
          ];

          return { ...fetchMoreResult };
        },
      });
      if (data.user.followers.list.length >= data.user.followers.total) {
        setHasMore(false);
      }
    } catch (err: any) {
      toastError(err.message);
    }
  };

  // TODO : A revoir
  useEffect(() => {
    if (followersQueryData?.user?.followers?.list?.length) {
      setPage(1);
      setHasMore(true);
    }
    console.log(followersQueryData);
    if (
      followersQueryData?.user?.followers?.list?.length! >=
      followersQueryData?.user?.followers?.total!
    ) {
      console.log('setHasMore(false)');
      setHasMore(false);
    }
  }, [followersQueryData]);

  useTriggerScrollFix([followersQueryData?.user?.followers.list?.length, page]);

  return (
    <>
      <InfiniteScroll
        className="h-full overflow-auto"
        dataLength={followersQueryData?.user?.followers.list?.length || 0}
        hasMore={hasMore}
        next={handleLoadMore}
        loader={
          <Loader
            strokeWidth={2}
            className="text-primary h-12 w-12 mt-4 mb-12 mx-auto"
          />
        }
      >
        {isEmpty(followersQueryData?.user?.followers.list) ? (
          loading && (
            <p className="text-center py-6 text-xl">
              You don’t have any followers yet
            </p>
          )
        ) : (
          <AnimatePresence>
            <ul className="overflow-y-hidden">
              {followersQueryData?.user?.followers.list.map(
                (follower: any, i: number) => {
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, translateY: 25 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateX: -25 }}
                    >
                      <Profile
                        padding="large"
                        userId={follower.id}
                        avatar={follower.profile.profilePicture}
                        username={follower.username}
                        displayname={follower.profile.displayname}
                        bio={follower.profile.bio}
                        withLink
                        withFollow
                        withMenu
                      />
                    </motion.li>
                  );
                }
              )}
            </ul>
          </AnimatePresence>
        )}
      </InfiniteScroll>
    </>
  );
};

const FollowersWithAccess = withAccess<NextComponent>(Followers, {
  accessType: 'auth',
});

FollowersWithAccess.getLayout = (component) => {
  return (
    <AppLayout noHeading>
      <FollowLayout headingTitle="Followers">{component}</FollowLayout>
    </AppLayout>
  );
};

export default FollowersWithAccess;
