import { gql } from '@apollo/client';

export default gql`
  query PostReplies($postId: Int!) {
    post(postId: $postId) {
      replies {
        total
        list {
          id
          draftRaw
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
    }
  }
`;
