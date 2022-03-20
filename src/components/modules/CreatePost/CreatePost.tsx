import React, { useEffect, useRef, useState } from 'react';
import Profile from '@components/modules/profile/Profile';
import { ImImage } from 'react-icons/im';
import Button from '@components/elements/button/Button';
import { useCreatePostMutation } from '@graphql/mutations/create-post/index.generated';
import { useDropzone } from 'react-dropzone';
import { useMedias } from '@hooks/useMedias';
import {
  toastWarning,
  toastError,
  HASHTAG_REGEX,
  MENTIONS_REGEX,
} from '@helpers/index';
import PostImagesGrid from '@components/elements/post-images-grid/PostImagesGrid';
import PostEditor from '@components/elements/post-editor/PostEditor';
import Link from '@components/elements/link/Link';
import reactStringReplace from 'react-string-replace';

const IMAGE_MAX_SIZE = 10_000_000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

const CreatePost = () => {
  const [postContent, setPostContent] = useState({
    plain: '',
    html: '',
  });
  const outputRef = useRef<HTMLDivElement>(null);
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
  const [formatOutput, setFormatOutput] = useState<React.ReactNode>();

  useEffect(() => {
    if (!outputRef.current) return;
    const text = 'yo #hello #world @admin0 @user';
    setFormatOutput(() => {
      let curr;
      curr = reactStringReplace(text, HASHTAG_REGEX, (match, i) => (
        <Link key={i} className="text-primary" href={`/hashtag/${match}`}>
          #{match}
        </Link>
      ));
      curr = reactStringReplace(curr, MENTIONS_REGEX, (match, i) => (
        <Link key={i} className="text-primary" href={`/${match}`}>
          @{match}
        </Link>
      ));
      return curr;
    });
  }, []);

  const handleCreatePost = async () => {
    const format = (value: string) => {
      return value.trim();
    };
    const extractMetaData = (value: string) => {
      const hashtags = value.match(HASHTAG_REGEX);
      const mentions = value.match(MENTIONS_REGEX);
      return {
        hashtags,
        mentions,
      };
    };
    console.log('** CREATE POST **');
    console.log('Medias : ', medias.medias);
    console.log('Plain content : ', format(postContent.plain));
    console.log('Plain without format content : ', postContent.plain);
    console.log(
      'Plain Metadata content : ',
      extractMetaData(postContent.plain)
    );
    console.log('HTML content : ', format(postContent.html));
    console.log('** END CREATE POST **');

    // try {
    //   await createPost({
    //     variables: {
    //       input: {
    //         body: null,
    //         postParentId: null,
    //         isFollowOnly: null,
    //       },
    //       medias: medias.medias.map((m) => m.file),
    //     },
    //   });
    // } catch (err) {
    //   toastError('Error while creating post, please try again');
    //   console.log(err);
    // }
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
          <PostEditor value={setPostContent} />

          <div ref={outputRef} className="border border-y py-4 my-4">
            {formatOutput}
          </div>
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
