import { gql } from '@apollo/client';

export default gql`
  query getCurrentUserId {
    me {
      id
    }
  }
`;
