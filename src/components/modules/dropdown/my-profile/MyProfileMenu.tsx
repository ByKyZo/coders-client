import { logout } from '@helpers/index';
import { Menu, MenuDivider, MenuItem } from '@szhsin/react-menu';
import React from 'react';
import Profile from '../../profile/Profile';

interface MyProfileMenuProps {
  menuButton: JSX.Element;
}

const MyProfileMenu = ({ menuButton }: MyProfileMenuProps) => {
  return (
    <Menu menuClassName="w-64" arrow menuButton={menuButton}>
      <MenuItem disabled>
        <Profile />
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );
};

export default MyProfileMenu;
