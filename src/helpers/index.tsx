import Router from 'next/router';

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const isBrowser = typeof window !== 'undefined';

export const getAccessToken = () => {
  if (!isBrowser) return;
  return localStorage.getItem(ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  if (!isBrowser) return;
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  if (!isBrowser) return;
  localStorage.removeItem(ACCESS_TOKEN);
};

export const loginUser = (accessToken: string) => {
  setAccessToken(accessToken);
  Router.push('/explore');
};

export const logout = () => {
  if (!isBrowser) return null;
  removeAccessToken();
  Router.push('/auth/login');
  window.location.reload();
};

export const splitURL = (url: string) => {
  return url.split('/').filter((v) => v);
};
