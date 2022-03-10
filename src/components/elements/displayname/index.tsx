import React from 'react';

interface UsernameProps {
  children?: string;
  username?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyle: any = {
  small: 'text-sm leading-none',
  medium: 'text-base leading-none',
  large: 'text-xl leading-none',
};

const Displayname = ({ children, size = 'medium' }: UsernameProps) => {
  return (
    <span
      // className={`font-bold flex w-full text-gray-800 ${sizeStyle[size]} overflow-ellipsis whitespace-nowrap overflow-hidden`}
      className={`font-bold text-gray-800 ${sizeStyle[size]} overflow-ellipsis whitespace-nowrap overflow-hidden`}
    >
      {children}
    </span>
  );
};

export default Displayname;
