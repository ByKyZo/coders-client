import React from 'react';

interface UsernameProps {
  children?: string;
  username?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyle: any = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl',
};

const Displayname = ({ children, size = 'medium' }: UsernameProps) => {
  return (
    <span className={`font-bold text-gray-800 ${sizeStyle[size]}`}>
      {children}
      {/* {data.user?.username} */}
    </span>
  );
};

export default Displayname;
