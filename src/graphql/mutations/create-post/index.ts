import { gql } from '@apollo/client';

export default gql`
  mutation CreatePost($input: CreatePostInput, $medias: [Upload!]) {
    createPost(input: $input, medias: $medias) {
      id
      body
      createdAt
      postParentId
      isFollowOnly
    }
  }
`;
