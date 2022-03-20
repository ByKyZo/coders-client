import { gql } from '@apollo/client';

export default gql`
  query User($username: String!) {
    user(username: $username) {
      id
      username
      email
      createdAt
      followings {
        total
      }
      followers {
        total
      }
      roles {
        level
        label
      }
      profile {
        displayname
        bio
        profilePicture
        backroundPicture
      }
    }
  }
`;
