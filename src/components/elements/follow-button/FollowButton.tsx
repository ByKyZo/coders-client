import { useToggleFollowMutation } from '@graphql/mutations/toggle-follow/index.generated';
import React from 'react';
import Button from '@components/elements/button/Button';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { useIsFollowQuery } from '@graphql/queries/is-follow/index.generated';
import { sizeType } from '@components/elements/button/Types';
import { useIsCurrentUser } from '../../../hooks/useIsCurrentUser';

interface FollowButtonProps {
  followingId: number;
  sizeType?: sizeType;
}

// TODO: La query is follow fait trop de rendu
const FollowButton = ({
  followingId,
  sizeType = 'medium',
}: FollowButtonProps) => {
  const { data: user } = useMeQuery();

  const isCurrentUser = useIsCurrentUser({
    id: followingId,
  });

  const { data: isFollow, refetch } = useIsFollowQuery({
    variables: { followerId: user?.me.id!, followingId: followingId },
  });
  // console.log(isFollow);

  const [toggleFollow, { loading }] = useToggleFollowMutation({
    onCompleted: () => refetch(),
  });

  if (isCurrentUser) return null;

  return (
    <Button
      as="button"
      isLoading={loading}
      onClick={() =>
        toggleFollow({
          variables: { followingId: followingId },
        })
      }
      styleType={!isFollow?.isFollow ? 'secondary' : 'secondaryOutline'}
      sizeType={sizeType}
      rounded
    >
      {!isFollow?.isFollow ? 'Follow' : 'Unfollow'}
    </Button>
  );
};

export default FollowButton;
