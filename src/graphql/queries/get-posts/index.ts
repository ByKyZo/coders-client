import { gql } from '@apollo/client';

export default gql`
  query Posts($input: FollowInput) {
    me {
      posts(input: $input) {
        total
        list {
          id
          body
          postParentId
          isFollowOnly
          createdAt
          medias {
            id
            path
          }
        }
      }
    }
  }
`;
