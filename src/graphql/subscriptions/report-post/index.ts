import { gql } from '@apollo/client';

export default gql`
  subscription ReportPostSub {
    reportPost {
      reason
      createdAt
      post {
        id
        author {
          id
          username
        }
      }
    }
  }
`;
