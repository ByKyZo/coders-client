import { ApolloProvider } from '@apollo/client';
import { store } from '@redux/store';
import '@styles/index.scss';
import '@styles/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import client from '../apollo-client';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
