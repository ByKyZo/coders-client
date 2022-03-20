import React, { useEffect } from 'react';
import Profile from '../profile/Profile';
import { ImImage } from 'react-icons/im';
import Button from '@components/elements/button/Button';
import { useCreatePostMutation } from '../../../graphql/mutations/create-post/index.generated';
import { useDropzone } from 'react-dropzone';
import { useMedias } from '@hooks/useMedias';
import { toastWarning, toastError } from '../../../helpers/index';
import PostImagesGrid from '@components/elements/post-images-grid/PostImagesGrid';
import PostEditor from '@components/elements/post-editor/PostEditor';

const IMAGE_MAX_SIZE = 10_000_000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

const CreatePost = () => {
  const [medias, setMedias] = useMedias({
    maxFiles: 4,
    onError: () => {
      toastWarning('Please choose 4 medias or less');
    },
  });

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    noClick: true,
    maxSize: IMAGE_MAX_SIZE,
    accept: ALLOWED_MIME,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setMedias((old) => ({ medias: [...old.medias, ...acceptedFiles] }));
    },
  });

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async () => {
    console.log('** CREATE POST **');
    console.log('Medias : ', medias.medias);
    console.log('** END CREATE POST **');

    try {
      await createPost({
        variables: {
          input: {
            body: null,
            postParentId: null,
            isFollowOnly: null,
          },
          medias: medias.medias.map((m) => m.file),
        },
      });
    } catch (err) {
      toastError('Error while creating post, please try again');
      console.log(err);
    }
  };

  return (
    <div className="flex items-start px-4">
      <div className="py-4">
        <Profile avatarOnly />
      </div>
      <div className="ml-4  flex-grow">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {/* <div className="py-4 outline-none cursor-text" contentEditable>
            What's happening ?
          </div> */}
          <PostEditor />
        </div>

        <PostImagesGrid
          context="edit"
          images={medias.medias.map((m) => m.preview)}
          onClickDelete={(index) => {
            setMedias((old) => ({
              medias: old.medias.filter((m, i) => i !== index),
            }));
          }}
        />

        <hr className="border-gray-200" />

        <div className="py-4 flex items-center justify-between">
          <Button
            icon={<ImImage />}
            onClick={() => {
              inputRef.current?.click();
            }}
            onlyIcon
            rounded
            styleType="primaryOutline"
            sizeType="medium"
          >
            Medias
          </Button>
          {/* <div className="flex space-x-2">
            
          </div> */}
          <Button
            onClick={handleCreatePost}
            styleType="primary"
            sizeType="medium"
            rounded
          >
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
