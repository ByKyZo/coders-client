import { gql } from '@apollo/client';

export default gql`
  query Followers($username: String!, $input: FollowInput) {
    user(username: $username) {
      followers(input: $input) {
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
