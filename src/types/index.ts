import { NextComponentType } from 'next';

export type NextComponent = NextComponentType & {
  getLayout?: (page: JSX.Element) => JSX.Element[] | JSX.Element;
};
