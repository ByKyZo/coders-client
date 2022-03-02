import { useRouter } from 'next/router';
import { getAccessToken } from '../helpers/index';
import { NextComponent } from '../types/index';

const withAuth = (WrappedComponent: NextComponent) => {
  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const accessToken = getAccessToken();

      // If there is no access token we redirect to "/auth/login" page.
      if (!accessToken) {
        Router.replace('/auth/login');
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props
      const getLayout = WrappedComponent.getLayout ?? ((page) => page);

      return getLayout(<WrappedComponent {...props} />);
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
