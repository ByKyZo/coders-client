import { gql } from '@apollo/client';

export default gql`
  mutation RemoveFollower($followerId: Int!) {
    removeFollower(followerId: $followerId) {
      userId
    }
  }
`;
