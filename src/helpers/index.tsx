import Cookies from 'js-cookie';
import Router from 'next/router';

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const ACCESS_TOKEN = 'access_token';

export const isBrowser = typeof window !== 'undefined';

export const getAccessToken = () => {
  // if (!isBrowser) return;
  // return localStorage.getItem(ACCESS_TOKEN);
  return Cookies.get(ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  // if (!isBrowser) return;
  // localStorage.setItem(ACCESS_TOKEN, token);
  return Cookies.set(ACCESS_TOKEN, token, {
    secure: true,
    expires: 999,
  });
};

export const removeAccessToken = () => {
  // if (!isBrowser) return;
  // localStorage.removeItem(ACCESS_TOKEN);
  return Cookies.remove(ACCESS_TOKEN);
};

export const loginUser = (accessToken: string) => {
  setAccessToken(accessToken);
  Router.push('/explore');
};

export const logout = () => {
  if (!isBrowser) return;
  removeAccessToken();
  Router.push('/auth/login');
  window.location.reload();
};

export const splitURL = (url: string) => {
  return url.split('/').filter((v) => v);
};
