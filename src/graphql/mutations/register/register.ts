import { gql } from '@apollo/client';

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
