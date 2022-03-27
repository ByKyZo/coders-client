import { gql } from '@apollo/client';

export default gql`
  query IsFollow($followerId: Int!, $followingId: Int!) {
    isFollow(followerId: $followerId, followingId: $followingId)
  }
`;
