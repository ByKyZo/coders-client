import { gql } from '@apollo/client';

export default gql`
  query TotalReplies($postId: Int!) {
    post(postId: $postId) {
      replies {
        total
      }
    }
  }
`;
