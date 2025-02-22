import { gql } from '@apollo/client';

export default gql`
  query Posts($username: String!, $input: GetPostsInput) {
    user(username: $username) {
      posts(input: $input) {
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
