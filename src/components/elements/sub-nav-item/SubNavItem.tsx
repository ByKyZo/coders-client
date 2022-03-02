import Link from '@components/elements/link/Link';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';

interface SubNavItemProps {
  label: string;
  href: string;
}

const SubNavItem = ({ label, href }: SubNavItemProps) => {
  return (
    <li className="px-2 py-8">
      <Link className="flex justify-between items-center" href={href}>
        <span>{label}</span>
        <BsChevronRight />
      </Link>
    </li>
  );
};

export default SubNavItem;
