import { gql } from '@apollo/client';

export default gql`
  query GetPostReported($postsInput2: FindAllPostInput) {
    posts(input: $postsInput2) {
      total
      list {
        id
        createdAt
        author {
          id
          username
        }
        reports {
          total
        }
      }
    }
  }
`;
