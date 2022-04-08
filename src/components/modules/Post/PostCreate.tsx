import React, { useRef, useState } from 'react';
import { useCreatePostMutation } from '@graphql/mutations/create-post/index.generated';
import { useDropzone } from 'react-dropzone';
import { useMedias } from '@hooks/useMedias';
import { toastWarning, toastError, toastInfo } from '@helpers/index';
import PostImagesGrid from '@components/elements/post-images-grid/PostImagesGrid';
import Editor from '@components/elements/editor/Editor';
import EditActions from '@components/modules/Post/EditActions';
import { useRefUpdate } from '@hooks/useRefUpdate';
import { EditorState } from 'draft-js';

const IMAGE_MAX_SIZE = 10_000_000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

interface IPostProps {
  parentPostId?: number;
  editorPlacerholder?: string;
  buttonCreateLabel?: string;
}

const PostCreate = ({
  parentPostId,
  editorPlacerholder,
  buttonCreateLabel,
}: IPostProps) => {
  const editorRef = useRef<any>(null);
  const [toolbarRef, setToolbarRef] = useRefUpdate<HTMLDivElement>();
  const [postContent, setPostContent] = useState({
    plain: '',
    html: '',
    raw: { blocks: [], entityMap: {} } as any,
  });
  const [medias, setMedias, { clear: clearMedias }] = useMedias({
    maxFiles: 4,
    onError: () => {
      toastWarning('Please choose 4 medias or less');
    },
  });

  const [createPost, { loading }] = useCreatePostMutation({
    update: (cache, { data }) => {
      if (data?.createPost) {
        const { createPost } = data;
        cache.modify({
          fields: {
            feed(oldFeed = {}) {
              if (parentPostId) return;

              return { ...oldFeed, list: [createPost, ...oldFeed.list] };
            },
            post(oldPost = {}) {
              if (!parentPostId) return;
              if (+parentPostId !== +oldPost.id) return;

              return {
                ...oldPost,
                replies: {
                  ...(oldPost.replies || {}),
                  list: [createPost, ...(oldPost.replies?.list || [])],
                },
              };
            },
          },
        });
      }
    },
  });

  const disabledCreatePost = !postContent.plain && medias.medias.length === 0;

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    noClick: true,
    maxSize: IMAGE_MAX_SIZE,
    accept: ALLOWED_MIME,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setMedias((old) => ({ medias: [...old.medias, ...acceptedFiles] }));
    },
  });

  const handleResetContent = () => {
    // TODO : Reset les content de l'editor
    // setPostContent({
    //   plain: '',
    //   html: '',
    //   raw: { blocks: [], entityMap: {} } as any,
    // });
  };

  const handleResetForm = () => {
    editorRef.current.handleResetEditor();
    clearMedias();
    handleResetContent();
  };

  const handleCreatePost = async () => {
    try {
      await createPost({
        variables: {
          input: {
            draftRaw: JSON.stringify(postContent.raw),
            postParentId: parentPostId,
            isFollowOnly: null,
          },
          medias: medias.medias.map((m) => m.file),
        },
      });
      handleResetForm();
      toastInfo('Post create successfully');
    } catch (err) {
      toastError('Error while creating post, please try again');
      console.log(err);
    }
  };

  const handleMediasDelete = (index: number) => {
    setMedias((old) => ({
      ...old,
      medias: { ...old.medias.filter((m, i) => i !== index) },
    }));
  };

  const handleSubmit = () => {
    handleCreatePost();
  };

  return (
    <div className="w-full" {...getRootProps()}>
      <input {...getInputProps()} />
      <Editor
        // ref= {editorRef}
        ref={editorRef}
        emojiButtonTriggerPortalDestinationElement={toolbarRef!}
        wrapperClassname="mt-2"
        readOnly={false}
        onChange={setPostContent}
        placeholder={editorPlacerholder}
        // editorStateValue={setEditorState}
      />

      <PostImagesGrid
        wrapperClassname="mt-2"
        context={'edit'}
        images={medias.medias.map((m) => m.preview)!}
        onClickDelete={handleMediasDelete}
      />

      <div className="mt-2">
        <EditActions
          buttonCreateLabel={buttonCreateLabel}
          context={'create'}
          loading={loading}
          onCreatePost={handleSubmit}
          inputRef={inputRef}
          setToolbarRef={setToolbarRef}
          disabledCreatePost={disabledCreatePost}
        />
      </div>
    </div>
  );
};

export default PostCreate;
