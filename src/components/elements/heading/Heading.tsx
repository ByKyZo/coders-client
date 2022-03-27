import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
interface HeadingProps {
  title: string;
  withGoBack?: boolean;
  withGoBackCallback?: () => void;
  noBorder?: boolean;
}

const Heading = ({
  title,
  withGoBack,
  withGoBackCallback,
  noBorder,
}: HeadingProps) => {
  const router = useRouter();
  return (
    <div
      className={`px-4 h h-14 flex items-center justify-between ${
        !noBorder ? 'border-b' : ''
      }`}
    >
      <div className="flex items-center">
        {(withGoBackCallback || withGoBack) && (
          <button
            className="mr-4 text-2xl"
            // @ts-ignore
            onClick={withGoBackCallback || router.back}
          >
            <FiChevronLeft />
          </button>
        )}
        {/* <Link href={"zez"} ></Link> */}
        <h2 className="capitalize text-xl font-semibold">{title}</h2>
      </div>
    </div>
  );
};

export default Heading;
