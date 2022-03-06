import { getAccessToken } from '@helpers/index';
import { useRouter } from 'next/router';

export const withNoAuth = (Element: any) => {
  return (props: any) => {
    // if (isBrowser) {
    const accessToken = getAccessToken();
    const router = useRouter();

    if (accessToken) {
      router.replace('/explore');
      return null;
    }

    return <Element {...props} />;
    // }
    // return null;
  };
};
