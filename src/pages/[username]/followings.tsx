import AppLayout from '@components/layouts/AppLayout';
import FollowLayout from '@components/layouts/FollowLayout';
import withAccess from '@hoc/withAccess';
import { NextComponent } from '@typescript/index';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFollowingsQuery } from '@graphql/queries/get-followings/index.generated';
import Profile from '@components/modules/profile/Profile';
import { isEmpty, toastError } from '@helpers/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@components/elements/loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import { useTriggerScrollFix } from '@hooks/useTriggerScrollFix';

/**
 * TODO : Créer une logique réutilisable entre les pages : followers / followings
 * TODO : Trouver une solution pour le bug de scroll sans bypass avec le hook useTriggerScrollFix()
 * WARNING : Cette page ne contient pas encore la meme logique que la page followers
 * WARNING : Cette page ne met pas en cache les datas
 */

const Followings = () => {
  const router = useRouter();
  const usernameParams = router.query.username as string;
  const { data: followingsQueryData, refetch: getFollowings } =
    useFollowingsQuery({
      variables: {
        username: usernameParams,
        input: { page: 0 },
      },
    });

  const [followings, setFollowings] = useState<any[]>(
    followingsQueryData?.user.followings.list || []
  );
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = async () => {
    console.log('from page : ', page);

    try {
      const { data: refetchFollowingsData } = await getFollowings({
        username: usernameParams,
        input: { page: page, take: 10 },
      });
      setPage((old) => old + 1);
      const followingsData = refetchFollowingsData!.user.followings.list!;
      if (isEmpty(followingsData)) {
        setHasMore(false);
      } else {
        setFollowings((oldState: any) => [...oldState, ...followingsData]);
      }
    } catch {
      toastError();
    }
  };

  useEffect(() => {
    return () => {
      setFollowings([]);
    };
  }, []);

  useTriggerScrollFix([followings.length]);

  return (
    <div>
      <InfiniteScroll
        dataLength={followings.length}
        hasMore={hasMore}
        next={handleLoadMore}
        loader={
          <Loader
            strokeWidth={2}
            className="text-primary h-12 w-12 mt-4 mb-12 mx-auto"
          />
        }
      >
        {isEmpty(followings) ? (
          <p className="text-center py-6 text-xl">
            You don’t have any followings yet
          </p>
        ) : (
          <AnimatePresence>
            <ul className="overflow-y-hidden">
              {followings.map((following: any, i: number) => {
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, translateY: 25 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Profile withFollow user={following} />
                  </motion.li>
                );
              })}
            </ul>
          </AnimatePresence>
        )}
      </InfiniteScroll>
    </div>
  );
};

const FollowingsWithAccess = withAccess<NextComponent>(Followings, {
  accessType: 'auth',
});

FollowingsWithAccess.getLayout = (component) => {
  return (
    <AppLayout noHeading>
      <FollowLayout headingTitle="Followings">{component}</FollowLayout>
    </AppLayout>
  );
};

export default FollowingsWithAccess;
