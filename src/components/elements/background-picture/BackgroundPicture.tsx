import React from 'react';

interface BackgroundPictureProps {
  url: string;
}

const BackgroundPicture = ({ url }: BackgroundPictureProps) => {
  return (
    <>
      <img
        className="object-cover max-h-[200px] h-[30vw] min-h-[80px]  w-full"
        src={url}
        alt="background picture"
      />
    </>
  );
};

export default BackgroundPicture;
