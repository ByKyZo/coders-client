import { gql } from '@apollo/client';

export default gql`
  mutation DeletePost($postId: Float) {
    deletePost(postId: $postId)
  }
`;
