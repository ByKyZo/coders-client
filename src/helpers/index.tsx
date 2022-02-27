import Router from 'next/router';

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const getAccessToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('ACCESS_TOKEN', token);
};

export const removeAccessToken = (token: string) => {
  localStorage.removeItem('ACCESS_TOKEN');
};

export const loginUser = (accessToken: string) => {
  setAccessToken(accessToken);
  Router.push('/explore');
};
