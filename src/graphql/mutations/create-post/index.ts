import { gql } from '@apollo/client';

export default gql`
  mutation CreatePost($input: CreatePostInput, $medias: [Upload!]) {
    createPost(input: $input, medias: $medias) {
      id
      draftRaw
      isFollowOnly
      createdAt
      medias {
        id
        path
      }
      author {
        id
        username
        profile {
          profilePicture
          displayname
        }
      }
    }
  }
`;
