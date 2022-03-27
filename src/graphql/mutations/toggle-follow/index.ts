import { gql } from '@apollo/client';

export default gql`
  mutation ToggleFollow($followingId: Int!) {
    toggleFollow(followingId: $followingId) {
      follower {
        id
        username
        followings {
          total
        }
        followers {
          total
        }
      }
      following {
        id
        username
        followings {
          total
        }
        followers {
          total
        }
      }
    }
  }
`;
