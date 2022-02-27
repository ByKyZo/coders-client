import { ApolloProvider } from '@apollo/client';
import rememberMe from '@graphql/queries/remember-me/remember-me';
import { store } from '@redux/store';
import '@styles/index.scss';
import '@styles/tailwind.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import client from '../apollo-client';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .query({
        query: rememberMe,
      })
      .then((res) => {
        console.log('REMEMBER : ', res.data);
      })
      .catch((err) => {
        console.log('NOT REMEMBER : ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);
  // if (loading) return null;

  // if (error) return <h1>Error</h1>;

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
