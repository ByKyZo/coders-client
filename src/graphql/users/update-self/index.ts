import { gql } from '@apollo/client';

export default gql`
  mutation UpdateSelf(
    $update: UpdateUserInput
    $profilePictureFile: Upload
    $backgroundPictureFile: Upload
  ) {
    updateSelf(
      update: $update
      profilePictureFile: $profilePictureFile
      backgroundPictureFile: $backgroundPictureFile
    ) {
      id
      username
      email
      createdAt
      roles {
        level
        label
      }
      profile {
        displayname
        bio
        backroundPicture
      }
    }
  }
`;
// export default gql`
//   mutation UpdateSelf($update: UpdateUserInput!) {
//     updateSelf(update: $update) {
//       id
//       username
//       email
//       createdAt
//       roles {
//         level
//         label
//       }
//       profile {
//         displayname
//         bio
//       }
//     }
//   }
// `;
