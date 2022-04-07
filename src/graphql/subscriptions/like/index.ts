import { gql } from '@apollo/client';

export default gql`
  subscription Like {
    toggle_like {
      user {
        id
      }
      post {
        id
      }
    }
  }
`;
