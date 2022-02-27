import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface CustomLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName?: string;
  notActiveClassName?: string;
  className?: string;
}

const Link = ({
  className,
  activeClassName = '',
  notActiveClassName = '',
  children,
  ...rest
}: CustomLinkProps) => {
  const router = useRouter();

  const isCurrent = router.pathname === rest.href;

  return (
    <NextLink {...rest}>
      <a
        className={`${className ? className : ''} ${
          isCurrent ? activeClassName : notActiveClassName
        }`}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
