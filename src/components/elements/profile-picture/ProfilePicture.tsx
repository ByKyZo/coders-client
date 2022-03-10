import React from 'react';
interface ProfilePictureProps {
  url: string;
  className?: string;
  size: 'small' | 'medium' | 'large';
}

const sizeStyle = {
  small: 'h-10 w-10',
  medium: 'h-12 h-12',
  large:
    'min-h-[60px] min-w-[60px] max-h-[120px] max-w-[120px] h-[20vw] w-[20vw]',
};

const ProfilePicture = ({ url, className, size }: ProfilePictureProps) => {
  return (
    <div className={`flex ${sizeStyle[size]}  ${className}`}>
      <img
        className="object-cover h-full w-full rounded-full ring-2 ring-white"
        src={url}
        alt={`profile`}
      />
    </div>
  );
};

export default ProfilePicture;
