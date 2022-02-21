import { gql } from '@apollo/client';

export interface createUserInput {
  username: string;
  displayname: string;
  email: string;
  password: string;
}

export const createUser = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $displayname: String!
    $email: String!
  ) {
    createUser(
      username: $username
      password: $password
      displayname: $displayname
      email: $email
    ) {
      username
      email
    }
  }
`;
