import { ApolloProvider } from '@apollo/client';
import PageLoader from '@components/modules/PageLoader/PageLoader';
import { RememberMeDocument } from '@graphql/users/remember-me/index.generated';
import { isBrowser, removeAccessToken } from '@helpers/index';
import { store } from '@redux/store';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/index.scss';
import '@styles/tailwind.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useApollo } from '../apollo-client';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

ReactModal.setAppElement('#__next');

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const apollo = useApollo(pageProps);

  useEffect(() => {
    if (!isBrowser) return;

    apollo
      .query({
        query: RememberMeDocument,
      })
      .then((res) => {
        console.log(res);
      })
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
      <ApolloProvider client={apollo}>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          limit={3}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <PageLoader isVisible={isLoading} />
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </Provider>
  );
};

// export default withApollo(App);
export default App;
