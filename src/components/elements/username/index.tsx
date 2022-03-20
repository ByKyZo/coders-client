import React from 'react';

interface UsernameProps {
  className?: string;
  children?: string;
  username?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyle: any = {
  small: 'text-xs leading-tight',
  medium: 'text-sm leading-tight',
  large: 'text-xl leading-tight',
};

const Username = ({ children, size = 'medium', className }: UsernameProps) => {
  return (
    <span className={`${sizeStyle[size]} ${className}`}>
      <span className="text-gray-500">@</span>
      {/* <span className="text-sm text-gray-400">{children}</span> */}
      <span className="text-gray-500 ">{children}</span>
    </span>
  );
};

export default Username;
