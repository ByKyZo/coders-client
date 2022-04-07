import { gql } from '@apollo/client';

export default gql`
  mutation ToggleLike($postId: Float!) {
    toggleLike(postId: $postId) {
      user {
        id
        username
      }
      post {
        id
      }
    }
  }
`;
