import { useToggleFollowMutation } from '@graphql/mutations/toggle-follow/index.generated';
import React from 'react';
import Button from '@components/elements/button/Button';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { useIsFollowQuery } from '@graphql/queries/is-follow/index.generated';
import { sizeType } from '@components/elements/button/Types';

interface FollowButtonProps {
  followingId: number;
  sizeType?: sizeType;
}

const FollowButton = ({
  followingId,
  sizeType = 'medium',
}: FollowButtonProps) => {
  const { data: user } = useMeQuery();

  const { data: isFollow, refetch } = useIsFollowQuery({
    variables: { followerId: user?.me.id!, followingId: followingId },
  });

  const [toggleFollow, { loading }] = useToggleFollowMutation({
    onCompleted: () => refetch(),
  });

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
