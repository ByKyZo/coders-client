import { gql } from '@apollo/client';

export const getMyProfile = gql`
  query Me {
    me {
      id
      username
      profile {
        displayname
      }
    }
  }
`;
