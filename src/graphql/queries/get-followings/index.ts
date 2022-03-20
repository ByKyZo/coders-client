import { gql } from '@apollo/client';

export default gql`
  query Followings($username: String!, $input: FollowInput) {
    user(username: $username) {
      followings(input: $input) {
        total
        list {
          id
          username
          email
          profile {
            displayname
            profilePicture
          }
        }
      }
    }
  }
`;
