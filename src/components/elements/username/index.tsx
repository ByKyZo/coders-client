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
    <div className="flex items-center  min-w-0 max-h-full">
      <span
        className={`min-w-0 flex-1 break-words overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 ${sizeStyle[size]} ${className}`}
      >
        @{children}
      </span>
    </div>
  );
};

export default Username;
