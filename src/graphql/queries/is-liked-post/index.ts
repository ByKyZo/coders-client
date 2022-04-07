import { gql } from '@apollo/client';

export default gql`
  query isLikedPost($postId: Int!) {
    isLikedPost(postId: $postId)
  }
`;
