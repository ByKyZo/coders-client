import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ACCESS_TOKEN, getAccessToken, isBrowser } from '@helpers/index';
import { createUploadLink } from 'apollo-upload-client';
import { useMemo } from 'react';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition, Reference } from '@apollo/client/utilities';

let apolloClient: ApolloClient<InMemoryCache>;

function createApolloClient(ctx?: any) {
  type TNodeEnv = { [k in typeof process['env']['NODE_ENV']]: string };

  // TODO : Penser a changer les endpoint en fonction de l'environnement
  const httpEndpoint: TNodeEnv = {
    production: 'https://coders-gql-api.herokuapp.com/graphql',
    // production: 'http://localhost:8000/graphql',
    development: 'http://localhost:8000/graphql',
    test: 'http://localhost:8000/graphql',
  };

  const wsEndpoint: TNodeEnv = {
    production: 'ws://coders-gql-api.herokuapp.com/graphql',
    // production: 'ws://localhost:8000/graphql',
    development: 'ws://localhost:8000/graphql',
    test: 'ws://localhost:8000/graphql',
  };

  const httpLink = createUploadLink({
    // Endpoint de l'API graphql
    uri: httpEndpoint[process.env.NODE_ENV],
  });

  const wsLink = isBrowser
    ? new WebSocketLink({
        uri: wsEndpoint[process.env.NODE_ENV],
        options: {
          reconnect: true,
          // lazy: false,
          connectionParams: {
            authToken: getAccessToken(),
          },
          connectionCallback: () => {
            console.log('graphql ws connected');
          },
        },
      })
    : null;

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = isBrowser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        // @ts-ignore
        wsLink,
        httpLink
      )
    : httpLink;

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
    // link: authLink.concat(httpLink),
    link: authLink.concat(link),
    // link: authLink.concat(httpLink),
    // link: link,
    cache: new InMemoryCache({
      // typePolicies: {
      //   Feed: {
      //     fields: {
      //       list: {
      //         merge(existing: any, incoming: any) {
      //           console.log('MERGE LIST');
      //           console.log('MERGE LIST');
      //           console.log('MERGE LIST');
      //           console.log('MERGE LIST');
      //           return [...existing, ...incoming];
      //         },
      //       },
      //     },
      //   },
      // },
      // typePolicies: {
      //   Query: {
      //     fields: {
      // user: {
      //   // keyArgs: false,
      //   keyArgs: false,
      /**
       * NOTE : Utiliser la fonction merge() pour les paginations plutôt que la 'updateQuery()' de la fonction fetchmore
       */
      // merge(existing, incoming) {
      // let users: Reference[] = [];
      // // users
      // if (existing && existing.users) {
      //   users = users.concat(existing.users);
      // }
      // if (incoming && incoming.users) {
      //   users = users.concat(incoming.users);
      // }
      // return {
      //   ...incoming,
      //   users,
      // };
      // console.log('existing : ', existing);
      // console.log('incoming : ', incoming);
      // if (!incoming?.user) {
      //   console.log('NO DATA');
      //   console.log('*******');
      //   // setHasMore(false);
      //   return existing;
      // }
      // const prevEntries = existing.followers.list || [];
      // const lastEntries = incoming.followers.list || [];
      // incoming.user.followers.list = [...prevEntries, ...lastEntries];
      // return { ...incoming };
      // },
      // },
      //   },
      // },
      // },
    }),
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
