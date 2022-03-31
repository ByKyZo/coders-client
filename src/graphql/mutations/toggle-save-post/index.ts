import { gql } from '@apollo/client';

export default gql`
  mutation ToggleSavePost($postId: Int!) {
    toggleSavePost(postId: $postId) {
      createdAt
      post {
        createdAt
      }
      user {
        createdAt
      }
    }
  }
`;
