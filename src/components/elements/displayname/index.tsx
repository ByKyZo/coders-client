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
    <div className="flex items-center  min-w-0 max-h-full">
      <span
        className={`min-w-0 flex-1 break-words overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-800 ${sizeStyle[size]} ${className}`}
      >
        {children}
      </span>
    </div>
  );
};

export default Displayname;
