import { gql } from '@apollo/client';

export default gql`
  query Me {
    me {
      id
      username
      profile {
        displayname
        bio
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
