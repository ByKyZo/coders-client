import { gql } from '@apollo/client';

export default gql`
  query RememberMe {
    rememberMe {
      accessToken
      user {
        id
        username
        roles {
          level
        }
      }
    }
  }
`;
