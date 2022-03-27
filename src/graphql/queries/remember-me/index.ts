import { gql } from '@apollo/client';

export default gql`
  query RememberMe {
    rememberMe {
      accessToken
      user {
        id
        username
        profile {
          displayname
        }
        roles {
          level
        }
      }
    }
  }
`;
