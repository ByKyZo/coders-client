import { LinkProps } from 'next/link';

export type styleType =
  | 'primary'
  | 'primaryOutline'
  | 'secondary'
  | 'secondaryOutline'
  | 'transparent';

export type sizeType = 'small' | 'medium' | 'large' | 'extralarge';

// ? Finir le loading du button
export type BaseProps = {
  children?: React.ReactNode;
  styleType: styleType;
  className?: string;
  sizeType?: sizeType;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
};

export type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

export type ButtonAsUnstyled = Omit<ButtonAsButton, 'as' | 'styleType'> & {
  as: 'unstyled';
  styleType?: BaseProps['styleType'];
  sizeType?: BaseProps['sizeType'];
};

export type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    as: 'link';
    linkAs?: string;
  };

export type ButtonAsExternal = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'externalLink';
  };
