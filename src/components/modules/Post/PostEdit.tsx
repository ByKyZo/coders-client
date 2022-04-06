import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toastWarning, toastError, toastInfo } from '@helpers/index';
import PostImagesGrid from '@components/elements/post-images-grid/PostImagesGrid';
import Editor from '@components/elements/editor/Editor';
import { RawDraftContentState } from 'draft-js';
import EditActions from '@components/modules/Post/EditActions';
import { useRefUpdate } from '@hooks/useRefUpdate';
import { useUpdatePostMutation } from '@graphql/mutations/update-post/index.generated';
import { PostMedia } from 'types';

const IMAGE_MAX_SIZE = 10_000_000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

interface IPostProps {
  postId: number;
  initMedias: Omit<PostMedia, '__typename' | 'PostEdit'>[];
  initRaw: RawDraftContentState;

  setContextToDisplay: () => void;
  onCancelEdit: () => void;
}

const PostEdit = ({
  postId,
  initMedias,
  initRaw,

  setContextToDisplay,
  onCancelEdit,
}: IPostProps) => {
  const [toolbarRef, setToolbarRef] = useRefUpdate<HTMLDivElement>();

  const [deletedMedias, setDeletedMedias] = useState<number[]>([]);
  const [mediasForEdit, setMediasForEdit] = useState<
    { file: File | null; id: number | null; preview: string }[]
  >([]);

  const [postContent, setPostContent] = useState({
    plain: '',
    html: '',
    raw: { blocks: [], entityMap: {} } as any,
  });

  const [updatePost, { loading }] = useUpdatePostMutation();

  const disabledCreatePost = !postContent.plain && mediasForEdit.length === 0;

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    noClick: true,
    maxSize: IMAGE_MAX_SIZE,
    accept: ALLOWED_MIME,
    multiple: true,
    onDrop: (acceptedFiles) => {
      setMediasForEdit((prevState) => {
        if (prevState.length + acceptedFiles.length > 4) {
          toastWarning('Please choose 4 medias or less');
          return prevState;
        }

        return [
          ...prevState,
          ...acceptedFiles.map((file) => ({
            id: null,
            file,
            preview: URL.createObjectURL(file),
          })),
        ];
      });
    },
  });

  const handleEditPost = async () => {
    try {
      const correctedMedias = mediasForEdit
        .filter(({ file }) => file !== null)
        .map((m) => m.file);

      // console.log('correctedMedias', correctedMedias);
      // console.log('deletedMedias', deletedMedias);

      const { data } = await updatePost({
        variables: {
          input: {
            id: postId!,
            draftRaw: JSON.stringify(postContent.raw),
            // postParentId: null,
            // isFollowOnly: null,
            mediasRemovedIds: deletedMedias,
          },
          medias: correctedMedias,
        },
      });

      console.log('Post edit', data);

      //   handleResetDeletedMedias();
      setContextToDisplay();
      toastInfo('PostEdit updated successfully');
    } catch (err) {
      toastError('Error while editing PostEdit, please try again');
      console.log(err);
    }
  };

  const handleSubmit = () => {
    console.log('edit');
    handleEditPost();
  };

  const handleMediasDelete = (index: number) => {
    // @ts-ignore
    setDeletedMedias((prevState) => {
      if (mediasForEdit[index].id) {
        return [...prevState, mediasForEdit[index].id];
      }
      return prevState;
    });
    setMediasForEdit((old) => old.filter((m, i) => i !== index));
  };

  useEffect(() => {
    if (!initMedias) return;
    setMediasForEdit(
      initMedias.map((m) => ({ file: null, id: m.id, preview: m.path }))
    );
  }, [initMedias]);

  return (
    <div className="w-full" {...getRootProps()}>
      <input {...getInputProps()} />
      <Editor
        emojiButtonTriggerPortalDestinationElement={toolbarRef!}
        wrapperClassname="mt-2"
        readOnly={false}
        initRaw={initRaw}
        onChange={setPostContent}
      />

      <PostImagesGrid
        wrapperClassname="mt-2"
        context={'edit'}
        // images={currentMediaDisplay()!}
        images={mediasForEdit.map((m) => m.preview)!}
        onClickDelete={handleMediasDelete}
      />

      <div className="mt-2">
        <EditActions
          context={'edit'}
          loading={loading}
          onCreatePost={handleSubmit}
          onCancelEdit={onCancelEdit}
          inputRef={inputRef}
          setToolbarRef={setToolbarRef}
          disabledCreatePost={disabledCreatePost}
        />
      </div>
    </div>
  );
};

export default PostEdit;
