import { gql } from '@apollo/client';

export default gql`
  query GetPostReports($postId: Int!) {
    post(postId: $postId) {
      reports {
        total
        list {
          createdAt
          reason
          user {
            id
            username
          }
        }
      }
    }
  }
`;
