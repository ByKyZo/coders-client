import Link from '@components/elements/link/Link';
import { MenuItem } from 'rc-menu';
import React from 'react';

interface INavItemProps {
  children: React.ReactNode;
  href: string;
}

const NavItem = ({ children, href }: INavItemProps) => {
  //   return <Link href={href}>{children}</Link>;
  return <MenuItem className="">{children}</MenuItem>;
};

export default NavItem;
