import Toast from '@components/elements/toast/Toast';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { IoCheckmarkCircle } from 'react-icons/io5';
import {
  RiErrorWarningFill,
  RiForbid2Fill,
  RiInformationFill,
} from 'react-icons/ri';
import { toast } from 'react-toastify';

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const HASHTAG_REGEX = /\B#(\w+)/gm;
export const MENTIONS_REGEX = /\B@(\w+)/gm;
export const ACCESS_TOKEN = 'access_token';

export const isBrowser = typeof window !== 'undefined';

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  return Cookies.set(ACCESS_TOKEN, token, {
    secure: true,
    expires: 999,
  });
};

export const removeAccessToken = () => {
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

export const toastSuccess = (content: string) => {
  // return toast.success(<Toast type="success" content={content} />);
  return toast.success(
    // <Toast type="error" content={content ? content : 'An error has occurred'} />,
    content,
    { icon: <IoCheckmarkCircle /> }
  );
};

/**
 *
 * @param content @default 'An error has occurred'
 * @returns
 */
export const toastError = (content?: string) => {
  return toast.error(
    // <Toast type="error" content={content ? content : 'An error has occurred'} />,
    content || 'An error has occurred',
    { icon: <RiForbid2Fill /> }
  );
};

export const toastWarning = (content?: string) => {
  // return toast.warning(<Toast type="warning" content={content} />);
  return toast.warning(content, {
    icon: <RiErrorWarningFill />,
  });
};

export const toastInfo = (content?: string) => {
  return toast.info(content, {
    icon: <RiInformationFill />,
  });
};
