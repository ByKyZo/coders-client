import { gql } from '@apollo/client';

export default gql`
  mutation UpdatePost($input: UpdatePostInput, $medias: [Upload!]) {
    updatePost(input: $input, medias: $medias) {
      id
      draftRaw
      isFollowOnly
      createdAt
      medias {
        path
        id
      }
      #   author {
      #     id
      #     username
      #     profile {
      #       profilePicture
      #     }
      #   }
    }
  }
`;
