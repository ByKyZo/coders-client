import { gql } from '@apollo/client';

export const login = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        username
      }
    }
  }
`;
