// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './helpers/index';

// Modifier l'endpoint en fonction de l'environnement
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

// Initialise apollo client et la mise en cache des données
const client = new ApolloClient({
  credentials: 'include',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // typePolicies: {
    //   User: {
    //     keyFields: ['id', 'username'],
    //   },
    // },
  }),
});

export default client;
