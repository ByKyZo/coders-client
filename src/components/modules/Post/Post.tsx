import React, { useEffect, useMemo, useState } from 'react';
import Profile from '@components/modules/profile/Profile';
import { useCreatePostMutation } from '@graphql/mutations/create-post/index.generated';
import { useDropzone } from 'react-dropzone';
import { useMedias } from '@hooks/useMedias';
import { toastWarning, toastError, toastInfo } from '@helpers/index';
import PostImagesGrid from '@components/elements/post-images-grid/PostImagesGrid';
import Editor from '@components/elements/editor/Editor';
import { RawDraftContentState } from 'draft-js';
import EditActions from '@components/modules/Post/EditActions';
import DisplayActions from './DisplayActions';
import { useIsCurrentUser } from '@hooks/useIsCurrentUser';
import { useRefUpdate } from '@hooks/useRefUpdate';
import PostMenu from '@components/modules/dropdown/post/PostMenu';
import { useUpdatePostMutation } from '@graphql/mutations/update-post/index.generated';
import { PostMedia } from 'types';
import { FeedDocument } from '@graphql/queries/get-feed/index.generated';
import { PostsDocument } from '@graphql/queries/get-posts/index.generated';
import { MeDocument } from '@graphql/queries/get-me/index.generated';
import { UserDocument } from '../../../graphql/queries/get-user/index.generated';

const IMAGE_MAX_SIZE = 10_000_000;
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

interface IPostProps {
  context: 'display' | 'edit' | 'create';
  raw?: RawDraftContentState;
  withFollow?: boolean;
  postId?: number;
  authorId?: number;
  authorAvatar?: string;
  authorUsername?: string;
  authorDisplayname?: string;
  authorMedias?: Omit<PostMedia, '__typename' | 'post'>[];
  authorCreatedAt?: string;

  onCreatePost?: () => void;
}

// TODO : Faire la modification des images
// TODO : Rajouter la property id dans le state, l'id peut être null pour les nouveaux medias
// TODO : Mais les id des medias delete seront push dans un tableau

const Post = ({
  context,
  raw = { blocks: [], entityMap: {} },
  withFollow,

  postId,
  authorId,
  authorAvatar,
  authorUsername,
  authorDisplayname,
  authorMedias,
  authorCreatedAt,

  onCreatePost,
}: IPostProps) => {
  if (!postId && (context === 'display' || context === 'edit')) {
    throw new Error('Post id is required on create or edit context');
  }
  // const [initRaw, setInitRaw] = useState<RawDraftContentState>(raw);
  const [toolbarRef, setToolbarRef] = useRefUpdate<HTMLDivElement>();
  const displayRaw = useMemo<RawDraftContentState>(() => raw, [raw]);

  const [_context, setContext] = useState(context);
  const [postContent, setPostContent] = useState({
    plain: '',
    html: '',
    raw: { blocks: [], entityMap: {} } as any,
  });

  const [deletedMedias, setDeletedMedias] = useState<number[]>([]);
  const [mediasForEdit, setMediasForEdit] = useState<
    { file: File | null; id: number | null; preview: string }[]
  >([]);
  // const [allMediaPrewiew, setAllMediaPreview] = useState<string[]>([]);

  const [medias, setMedias, { clear: clearMedias }] = useMedias({
    maxFiles: 4,
    onError: () => {
      toastWarning('Please choose 4 medias or less');
    },
  });

  const disabledCreatePost = !postContent.plain && medias.medias.length === 0;

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    noClick: true,
    maxSize: IMAGE_MAX_SIZE,
    accept: ALLOWED_MIME,
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (_context === 'edit') {
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
      } else {
        setMedias((old) => ({ medias: [...old.medias, ...acceptedFiles] }));
      }
    },
  });

  const [createPost] = useCreatePostMutation({
    update: (cache, { data }) => {
      if (data?.createPost) {
        const { createPost } = data;
        cache.modify({
          fields: {
            feed(oldFeed = {}) {
              return { ...oldFeed, list: [createPost, ...oldFeed.list] };
            },
          },
        });
      }
    },
  });
  const [updatePost, { loading }] = useUpdatePostMutation();

  const setContextToEdit = () => setContext('edit');
  const setContextToDisplay = () => setContext('display');

  const handleResetDeletedMedias = () => {
    setDeletedMedias([]);
  };
  const handleResetContent = () => {
    setDeletedMedias([]);
    // TODO : Reset les content de l'editor
    setPostContent({
      plain: '',
      html: '',
      raw: { blocks: [], entityMap: {} } as any,
    });
  };
  const handleResetForm = () => {
    clearMedias();
    handleResetContent();
  };

  const handleCreatePost = async () => {
    try {
      await createPost({
        variables: {
          input: {
            draftRaw: JSON.stringify(postContent.raw),
            postParentId: null,
            isFollowOnly: null,
          },
          medias: medias.medias.map((m) => m.file),
        },
      });
      onCreatePost && onCreatePost();
      handleResetForm();
      toastInfo('Post create successfully');
    } catch (err) {
      toastError('Error while creating post, please try again');
      console.log(err);
    }
  };

  const handleEditPost = async () => {
    try {
      const correctedMedias = mediasForEdit
        .filter(({ file }) => file !== null)
        .map((m) => m.file);

      console.log('correctedMedias', correctedMedias);
      console.log('deletedMedias', deletedMedias);

      await updatePost({
        variables: {
          input: {
            id: postId!,
            draftRaw: JSON.stringify(postContent.raw),
            postParentId: null,
            isFollowOnly: null,
            mediasRemovedIds: deletedMedias,
          },
          medias: correctedMedias,
        },
      });

      handleResetDeletedMedias();
      toastInfo('Post updated successfully');
      setContextToDisplay();
    } catch (err) {
      toastError('Error while editing post, please try again');
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (_context === 'edit') {
      console.log('edit');
      handleEditPost();
    } else {
      console.log('create');
      handleCreatePost();
    }
  };

  const currentMediaDisplay = () => {
    if (_context === 'edit') {
      return mediasForEdit.map((m) => m.preview);
    } else if (_context === 'create') {
      return medias.medias.map((m) => m.preview);
    } else {
      return authorMedias?.map((m) => m.path);
    }
  };

  const handleMediasDelete = (index: number) => {
    if (_context === 'edit') {
      // @ts-ignore
      setDeletedMedias((prevState) => {
        if (mediasForEdit[index].id) {
          return [...prevState, mediasForEdit[index].id];
        }
        return prevState;
      });
      setMediasForEdit((old) => old.filter((m, i) => i !== index));
    } else {
      setMedias((old) => ({
        medias: old.medias.filter((m, i) => i !== index),
      }));
    }
  };

  useEffect(() => {
    if (!authorMedias) return;
    setMediasForEdit(
      authorMedias.map((m) => ({ file: null, id: m.id, preview: m.path }))
    );
  }, [_context, authorMedias]);

  useEffect(() => {
    console.log(deletedMedias);
  }, [deletedMedias]);

  return (
    <div className="flex items-start px-4 border-b">
      <div className="min-w-0 flex-grow">
        <div className="py-4">
          <Profile
            hideCustomMenu={context === 'create'}
            namesDirection="row"
            menu={(button) => {
              return (
                <PostMenu
                  username={authorUsername!}
                  onEdit={setContextToEdit}
                  menuButton={button}
                />
              );
            }}
            withFollow={withFollow}
            userId={authorId}
            avatar={_context === 'create' ? undefined : authorAvatar}
            username={_context === 'create' ? undefined : authorUsername}
            displayname={_context === 'create' ? undefined : authorDisplayname}
            date={_context === 'create' ? undefined : authorCreatedAt}
            forCurrentUser={{
              avatar: true,
            }}
            info={
              <div className="w-full" {...getRootProps()}>
                <input {...getInputProps()} />

                <Editor
                  emojiButtonTriggerPortalDestinationElement={toolbarRef!}
                  wrapperClassname="mt-2"
                  readOnly={_context === 'display'}
                  context={_context}
                  initRaw={displayRaw}
                  onChange={setPostContent}
                  // onChange={({ raw }) => {
                  //   // setEditRaw(raw);
                  //   setEditRaw(raw);
                  // }}
                />

                <PostImagesGrid
                  wrapperClassname="mt-2"
                  context={
                    _context === 'create' || _context === 'edit'
                      ? 'edit'
                      : 'display'
                  }
                  images={currentMediaDisplay()!}
                  onClickDelete={handleMediasDelete}
                />

                <div className="mt-2">
                  {_context === 'create' || _context === 'edit' ? (
                    <EditActions
                      context={_context}
                      loading={loading}
                      // onCreatePost={handleCreatePost}
                      onCreatePost={handleSubmit}
                      onCancelEdit={setContextToDisplay}
                      inputRef={inputRef}
                      setToolbarRef={setToolbarRef}
                      disabledCreatePost={disabledCreatePost}
                    />
                  ) : (
                    <DisplayActions />
                  )}
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
