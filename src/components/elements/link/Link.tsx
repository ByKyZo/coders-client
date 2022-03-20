import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { splitURL } from '../../../helpers/index';

// TODO: Créer les props : activeCallback (qui se declenche quand l'url match)
interface CustomLinkProps extends React.PropsWithChildren<LinkProps> {
  activeClassName?: string;
  // activeCallback?: boolean;
  withHover?: boolean;
  notActiveClassName?: string;
  className?: string;
  activeOnRootPathName?: boolean;
}

const Link = ({
  className,
  activeClassName = '',
  notActiveClassName = '',
  activeOnRootPathName,
  withHover,
  children,
  ...rest
}: CustomLinkProps) => {
  const router = useRouter();

  const isCurrent = activeOnRootPathName
    ? splitURL(router.asPath)[0] === splitURL(rest.href as string)[0]
    : router.asPath === rest.href;

  // useEffect(() => {

  // },[isCurrent])

  // if (!isBrowser) return null;

  return (
    <NextLink {...rest}>
      <a
        className={`${className ? className : ''} ${
          isCurrent ? activeClassName : notActiveClassName
        } ${withHover ? 'hover:underline' : ''}`}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
