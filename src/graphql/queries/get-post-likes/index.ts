import { gql } from '@apollo/client';

export default gql`
  query PostLike($postId: Int!) {
    post(postId: $postId) {
      likes {
        total
      }
    }
  }
`;
