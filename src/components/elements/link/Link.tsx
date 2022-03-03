import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { isBrowser, splitURL } from '../../../helpers/index';

interface CustomLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName?: string;
  notActiveClassName?: string;
  className?: string;
  activeOnRootPathName?: boolean;
}

const Link = ({
  className,
  activeClassName = '',
  notActiveClassName = '',
  activeOnRootPathName,
  children,
  ...rest
}: CustomLinkProps) => {
  const router = useRouter();

  const isCurrent = activeOnRootPathName
    ? splitURL(router.pathname)[0] === splitURL(rest.href as string)[0]
    : router.pathname === rest.href;

  if (!isBrowser) return null;

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
