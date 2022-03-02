import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './helpers/index';

// Modifier l'endpoint en fonction de l'environnement
const endpoint =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000/graphql'
    : 'http://localhost:8000/graphql';

const httpLink = createHttpLink({
  // Endpoint de l'API graphql
  uri: endpoint,
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
