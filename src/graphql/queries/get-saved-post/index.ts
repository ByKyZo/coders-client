import { gql } from '@apollo/client';

export default gql`
  query GetSavedPost($username: String!) {
    user(username: $username) {
      savedPost {
        total
        list {
          post {
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
  }
`;
