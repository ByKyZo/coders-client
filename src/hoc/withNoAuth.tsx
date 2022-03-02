import { getAccessToken, isBrowser } from '@helpers/index';
import { NextComponent } from '@types/index';
import { useRouter } from 'next/router';

export const withNoAuth = (Element: NextComponent) => {
  return (props: any) => {
    if (isBrowser) {
      const accessToken = getAccessToken();
      const router = useRouter();

      if (accessToken) {
        router.replace('/explore');
        return null;
      }

      return <Element {...props} />;
    }
    return null;
  };
};
