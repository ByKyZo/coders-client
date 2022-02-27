import { gql } from '@apollo/client';

export const login = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        id
        username
        roles {
          level
          label
        }
      }
    }
  }
`;
