import React from 'react';
interface ProfilePictureProps {
  url: string | null;
  className?: string;
  empty?: boolean;
  size: 'small' | 'medium' | 'large';
}

const sizeStyle = {
  small: 'h-10 w-10',
  medium: 'h-12 h-12',
  large:
    'min-h-[60px] min-w-[60px] max-h-[120px] max-w-[120px] h-[20vw] w-[20vw]',
};

const BASE_CLASS = 'h-full w-full rounded-full ring-2 ring-white';

const ProfilePicture = ({
  url,
  className,
  size,
  empty,
}: ProfilePictureProps) => {
  return (
    <div className={`flex ${sizeStyle[size]}  ${className}`}>
      {!url || empty ? (
        <div className={`bg-gray-800 ${BASE_CLASS}`}></div>
      ) : (
        <img
          className={`object-cover ${BASE_CLASS}`}
          src={url}
          alt={`profile`}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
