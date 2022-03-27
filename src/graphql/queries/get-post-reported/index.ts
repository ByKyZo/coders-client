import { gql } from '@apollo/client';

export default gql`
  query GetPostReported($postsInput2: FindAllPostInput) {
    posts(input: $postsInput2) {
      total
      list {
        id
        createdAt
        draftRaw
        author {
          id
          username
        }
        reports {
          total
          list {
            reason
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
