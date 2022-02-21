import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface CustomLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName?: string;
  className?: string;
}

const Link = ({
  className,
  activeClassName = '',
  children,
  ...rest
}: CustomLinkProps) => {
  const router = useRouter();

  const isCurrent = router.pathname === rest.href;

  return (
    <NextLink {...rest}>
      <a className={`${className} ${isCurrent ? activeClassName : ''}`}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
