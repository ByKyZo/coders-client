import { gql } from '@apollo/client';

export default gql`
  query IsSavedPost($postId: Int!) {
    isSavedPost(postId: $postId)
  }
`;
