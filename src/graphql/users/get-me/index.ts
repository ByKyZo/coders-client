import { gql } from '@apollo/client';

export default gql`
  query Me {
    me {
      id
      username
      profile {
        displayname
        bio
        profilePicture
        backroundPicture
      }
      email
      createdAt
      roles {
        level
        label
      }
    }
  }
`;

// export default gql`
//   query Me {
//     me {
//       id
//       username
//       profile {
//         displayname
//       }
//     }
//   }
// `;
