import NavItem from '@components/admin/AdminNavItem';
import Link from '@components/elements/link/Link';
import withAccess from '@hoc/withAccess';
import Menu, { SubMenu, MenuItem } from 'rc-menu';
import 'rc-menu/assets/index.css';
import React from 'react';
import { NextComponent, UserRoles } from '@typescript/index';
import { IoChevronBackSharp } from 'react-icons/io5';
import Button from '@components/elements/button/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex ">
      <div>
        <Menu mode="inline" className="h-screen min-w-[250px]">
          <MenuItem>
            <Link className="flex items-center font-bold" href="/home">
              <IoChevronBackSharp />
              <span className="ml-2">Back to App</span>
            </Link>
          </MenuItem>
          <SubMenu title="Report">
            <MenuItem>
              <Link className="block" href="/admin/report/user">
                User
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className="block" href="/admin/report/post">
                Post
              </Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </div>
      <div className="flex-grow px-4">{children}</div>
    </div>
  );
};

const AdminLayoutWithAccess = withAccess<any>(AdminLayout, {
  accessType: 'auth',
  role: UserRoles.Admin,
});

export const getAdminLayout = (page: React.Component<AdminLayoutProps>) => {
  return <AdminLayoutWithAccess {...page.props}>{page}</AdminLayoutWithAccess>;
};

export default AdminLayoutWithAccess;
// export default withAccess<any>(AdminLayout, {
//   accessType: 'auth',
//   role: UserRoles.Admin,
// });
