import { gql } from '@apollo/client';

export default gql`
  mutation UpdateSelf($update: UpdateUserInput!) {
    updateSelf(update: $update) {
      id
      username
      email
      createdAt
      roles {
        level
        label
      }
      profile {
        displayname
        bio
      }
    }
  }
`;
