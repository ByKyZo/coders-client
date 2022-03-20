import { gql } from '@apollo/client';

export default gql`
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
