import { gql } from '@apollo/client';

export default gql`
  query Posts($username: String!, $input: FollowInput) {
    user(username: $username) {
      posts(input: $input) {
        total
        list {
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
    }
  }
`;
