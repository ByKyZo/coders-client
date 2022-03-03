import { ApolloProvider } from '@apollo/client';
import rememberMe from '@graphql/queries/remember-me/remember-me';
import { removeAccessToken } from '@helpers/index';
import { store } from '@redux/store';
import '@styles/index.scss';
import '@styles/tailwind.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import client from '../apollo-client';
import PageLoader from '../components/modules/PageLoader/PageLoader';
import { isBrowser } from '../helpers/index';

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
        query: rememberMe,
      })
      .then((res) => {})
      .catch((err) => {
        router.push('/auth/login');
        removeAccessToken();
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
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
