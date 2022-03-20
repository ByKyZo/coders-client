import { gql } from '@apollo/client';

export default gql`
  subscription Follow {
    follow {
      follower {
        id
        followings {
          total
        }
        followers {
          total
        }
      }
      following {
        id
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
