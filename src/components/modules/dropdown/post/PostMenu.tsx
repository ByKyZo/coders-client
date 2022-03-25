import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { useIsCurrentUser } from '@hooks/useIsCurrentUser';
import { Menu, MenuItem } from '@szhsin/react-menu';
import React from 'react';

interface MyProfileMenuProps {
  username: string;
  menuButton: JSX.Element;
  onEdit: () => void;
}

const PostMenu = ({ username, menuButton, onEdit }: MyProfileMenuProps) => {
  const isCurrentUser = useIsCurrentUser({
    username: username,
  });

  // TODO : Bug le menu ne reste pas sur lelement au scroll
  // TODO : Bug le menu ne reste pas sur lelement au scroll
  // TODO : Bug le menu ne reste pas sur lelement au scroll

  return (
    <Menu menuClassName="w-64" arrow menuButton={menuButton}>
      {isCurrentUser && <MenuItem onClick={onEdit}>Edit</MenuItem>}
      {isCurrentUser && <MenuItem disabled>Delete</MenuItem>}
      {!isCurrentUser && <MenuItem disabled>Report</MenuItem>}
    </Menu>
  );
};

export default PostMenu;
