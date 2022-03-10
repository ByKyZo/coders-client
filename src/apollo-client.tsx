import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ACCESS_TOKEN, getAccessToken } from '@helpers/index';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<InMemoryCache>;

function createApolloClient(ctx?: any) {
  const endpoint = {
    production: 'http://localhost:8000/graphql',
    development: 'http://localhost:8000/graphql',
  };

  const httpLink = createUploadLink({
    // Endpoint de l'API graphql
    // @ts-ignore
    uri: endpoint[process.env.NODE_ENV],
  });

  const authLink = setContext((_, { headers }) => {
    // Récupere le jwt token du local storage
    // const token = getAccessToken();
    let token;

    // Si on est sur le serveur on recupere le cookie via le context
    if (typeof window === 'undefined') {
      token = ctx?.req.cookies[ACCESS_TOKEN];
    } else {
      // Sinon via la fonction client
      token = getAccessToken();
    }

    // Return le Bearer token dans le header authorization
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState?: any, ctx?: any) {
  //! On passe le context pour récuperer le token dans le cookie coté serveur
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
