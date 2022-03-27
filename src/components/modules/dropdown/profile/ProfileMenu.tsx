import { logout, toastError, toastSuccess } from '@helpers/index';
import { Menu, MenuDivider, MenuItem } from '@szhsin/react-menu';
import React from 'react';
import Profile from '../../profile/Profile';
import { useRemoveFollowerMutation } from '../../../../graphql/mutations/remove-follower/index.generated';
import { toast } from 'react-toastify';
import { UserDocument } from '@graphql/queries/get-user/index.generated';
import Username from '@components/elements/username';
import { FollowersDocument } from '@graphql/queries/get-followers/index.generated';

/**
 * TODO : Faire le report
 */

interface ProfileMenuProps {
  menuButton: JSX.Element;
  userId: number;
  username: string;
}

const ProfileMenu = ({ menuButton, username, userId }: ProfileMenuProps) => {
  const [removeFollower] = useRemoveFollowerMutation({
    variables: { followerId: userId },
    update: (cache) => {
      // TODO: Voir pour une autre solution car il supprime toute les references du user ->
      // Et pas seulement celle dans la liste des followers
      // https://blog.efounders.co/optimising-list-item-deletion-with-apollos-client-directive-and-fragments-dc2affc3c3ef

      const normalizedId = cache.identify({
        id: userId,
        __typename: 'User',
      });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
    onError: () => toastError(),
    refetchQueries: [
      { query: FollowersDocument, variables: { username: username } },
    ],
    onCompleted: () =>
      toastSuccess(`@${username} has been removed from your followers`),
  });

  const handleRemoveFollower = () => {
    removeFollower();
  };

  return (
    <Menu
      direction="bottom"
      align="center"
      menuClassName="w-64"
      className="w-"
      arrow
      menuButton={menuButton}
    >
      <MenuItem onClick={handleRemoveFollower}>Remove this follower</MenuItem>
      {/* <MenuItem>Report</MenuItem> */}
    </Menu>
  );
};

export default ProfileMenu;
