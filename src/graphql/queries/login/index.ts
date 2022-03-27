import { gql } from '@apollo/client';

export default gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        id
        username
        profile {
          displayname
        }
        roles {
          level
          label
        }
      }
    }
  }
`;
