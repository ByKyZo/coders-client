import { gql } from '@apollo/client';

export default gql`
  query Post($postId: Int!) {
    post(postId: $postId) {
      id
      draftRaw
      postParentId
      isFollowOnly
      createdAt
      medias {
        id
        path
      }
      author {
        id
        username
        profile {
          profilePicture
          displayname
        }
      }
    }
  }
`;
