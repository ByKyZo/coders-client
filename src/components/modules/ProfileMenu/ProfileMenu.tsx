import { logout } from '@helpers/index';
import { Menu, MenuDivider, MenuItem } from '@szhsin/react-menu';
import React from 'react';
import Profile from '../profile/Profile';

interface ProfileMenuProps {
  menuButton: JSX.Element;
}

const ProfileMenu = ({ menuButton }: ProfileMenuProps) => {
  return (
    <Menu menuClassName="w-64" className="w-" arrow menuButton={menuButton}>
      <MenuItem disabled>
        <Profile />
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
