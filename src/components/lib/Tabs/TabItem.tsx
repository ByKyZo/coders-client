import Link from '@components/elements/link/Link';
import React from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

interface TabItemProps {
  href: string;
  label: string;
}

const TabItem = ({ href, label }: TabItemProps) => {
  return (
    <li key={uuidv4()}>
      <Link
        className="flex box-border border-r-2  justify-between items-center px-4 py-6 text-sm hover:bg-gray-100"
        notActiveClassName="border-transparent"
        activeClassName="border-primary"
        href={href}
      >
        <span>{label}</span>
        <BsChevronRight />
      </Link>
    </li>
  );
};

export default TabItem;
