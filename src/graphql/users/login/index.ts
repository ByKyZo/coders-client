import { gql } from '@apollo/client';

export default gql`
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
