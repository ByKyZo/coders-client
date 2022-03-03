import { useRouter } from 'next/router';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { isBrowser } from '../../../helpers/index';
interface HeadingProps {
  title: string;
  withGoBack?: boolean;
  noBorder?: boolean;
}

const Heading = ({ title, withGoBack, noBorder }: HeadingProps) => {
  const router = useRouter();

  if (!isBrowser) return null;

  return (
    <div
      className={`px-4 h h-14 flex items-center justify-between ${
        !noBorder ? 'border-b' : ''
      }`}
    >
      <div className="flex items-center">
        {withGoBack && (
          <button className="mr-4 text-2xl" onClick={() => router.back()}>
            <FiChevronLeft />
          </button>
        )}
        <h2 className="capitalize text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default Heading;
