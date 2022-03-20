import React from 'react';

interface UsernameProps {
  className?: string;
  children?: string | undefined | null;
  username?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyle: any = {
  small: 'text-sm leading-tight',
  medium: 'text-base leading-tight',
  large: 'text-xl leading-tight',
};

const Displayname = ({
  children,
  size = 'medium',
  className,
}: UsernameProps) => {
  return (
    <span
      // className={`font-bold flex w-full text-gray-800 ${sizeStyle[size]} overflow-ellipsis whitespace-nowrap overflow-hidden`}
      className={`inline-block min-w-0 max-w-[150px] font-bold text-gray-800 ${sizeStyle[size]} overflow-ellipsis whitespace-nowrap overflow-hidden ${className}`}
    >
      {children}
    </span>
  );
};

export default Displayname;
