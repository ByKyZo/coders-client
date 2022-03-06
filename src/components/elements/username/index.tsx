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

const Username = ({ children, size = 'medium' }: UsernameProps) => {
  return (
    <span className={sizeStyle[size]}>
      <span className="text-gray-400">@</span>
      <span className="text-sm text-gray-400">{children}</span>
    </span>
  );
};

export default Username;
