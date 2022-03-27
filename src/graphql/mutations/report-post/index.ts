import { gql } from '@apollo/client';

export default gql`
  mutation ReportPost($input: PostReportInput!) {
    reportPost(input: $input) {
      reason
      createdAt
      user {
        id
        username
      }
      post {
        id
      }
    }
  }
`;
