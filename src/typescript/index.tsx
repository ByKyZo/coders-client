import { NextComponentType } from 'next';

export type NextComponent<T = {}> = NextComponentType<T, T, T> & {
  // getLayout?: (page: React.Component) => JSX.Element[] | JSX.Element;
  getLayout?: (page: any) => JSX.Element[] | JSX.Element;
};

export enum UserRoles {
  User = 1,
  Moderator = 2,
  Admin = 3,
}
