import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '@helpers/index';

let globalApolloClient: ApolloClient<any>;

const endpoint = {
  production: 'http://localhost:8000/graphql',
  development: 'http://localhost:8000/graphql',
};

const httpLink = createHttpLink({
  // Endpoint de l'API graphql
  // @ts-ignore
  uri: endpoint[process.env.NODE_ENV],
});

const authLink = setContext((_, { headers }) => {
  // Récupere le jwt token du local storage
  const token = getAccessToken();
  // Return le Bearer token dans le header authorization
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function initApolloClient(initialState: any) {
  if (!globalApolloClient) {
    globalApolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        // typePolicies: {
        //   User: {
        //     keyFields: ['id', 'username'],
        //   },
        // },
      }),
    });
  }
  // client side page transition to an SSG page => update Apollo cache
  else if (initialState) {
    globalApolloClient.cache.restore({
      ...globalApolloClient.cache.extract(),
      ...initialState,
    });
  }
  return globalApolloClient;
}

export function withApollo(PageComponent: any) {
  const WithApollo = ({ apolloStaticCache, ...pageProps }: any) => {
    // HERE WE USE THE PASSED CACHE
    const client = initApolloClient(apolloStaticCache);
    // and here we have the initialized client 🙂
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };
  // if you also use it for SSR
  if (PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async () => {
      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }
      return pageProps;
    };
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    WithApollo.displayName = `withApollo(${displayName})`;
  }
  return WithApollo;
}
