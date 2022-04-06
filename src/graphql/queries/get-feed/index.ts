import { gql } from '@apollo/client';

export default gql`
  query Feed($input: FeedInput) {
    feed(input: $input) {
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
`;
