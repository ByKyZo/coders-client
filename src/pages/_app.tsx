import { ApolloProvider } from '@apollo/client';
import PageLoader from '@components/modules/PageLoader/PageLoader';
import { RememberMeDocument } from '@graphql/users/remember-me/index.generated';
import { isBrowser, removeAccessToken } from '@helpers/index';
import { store } from '@redux/store';
import '@styles/index.scss';
import '@styles/tailwind.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import client from '../apollo-client';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isBrowser) return;

    client
      .query({
        query: RememberMeDocument,
      })
      .then((res) => {})
      .catch((err) => {
        // router.push('/auth/login');
        removeAccessToken();
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PageLoader isVisible={isLoading} />
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
