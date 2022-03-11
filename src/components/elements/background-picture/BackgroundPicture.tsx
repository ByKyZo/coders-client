import React from 'react';

interface BackgroundPictureProps {
  url: string | null;
  empty?: boolean;
}

const BASE_CLASS = 'max-h-[200px] h-[30vw] min-h-[80px] w-full';

const BackgroundPicture = ({ url, empty }: BackgroundPictureProps) => {
  return (
    <>
      {!url || empty ? (
        <div className={`bg-gray-400 ${BASE_CLASS}`}></div>
      ) : (
        <img
          className={`object-cover ${BASE_CLASS}`}
          src={url}
          alt="background picture"
        />
      )}
    </>
  );
};

export default BackgroundPicture;
