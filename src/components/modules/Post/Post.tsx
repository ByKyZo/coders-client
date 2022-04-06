import React, { useEffect, useRef, useState } from 'react';
import Profile from '@components/modules/profile/Profile';
import { Editor, RawDraftContentState } from 'draft-js';

import PostMenu from '@components/modules/dropdown/post/PostMenu';
import { PostMedia } from 'types';
import PostEdit from './PostEdit';
import PostCreate from './PostCreate';
import PostDisplay from './PostDisplay';
import { Post as PostType } from 'types';
import Link from '@components/elements/link/Link';
import ConditionalWrapper from '@components/elements/conditional-wrapper/ConditionalWrapper';

interface IPostProps {
  context: 'display' | 'edit' | 'create';
  raw?: RawDraftContentState;
  post?: Partial<PostType>;
  parentPostId?: number;
  editorPlacerholder?: string;
  buttonCreateLabel?: string;
  onCreatePost?: () => void;
}

const Post = ({
  context,
  raw = { blocks: [], entityMap: {} },
  post,
  editorPlacerholder,
  buttonCreateLabel,
  parentPostId,
}: IPostProps) => {
  if (!post?.id && (context === 'display' || context === 'edit')) {
    throw new Error('Post id is required on create or edit context');
  }
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [_context, setContext] = useState(context);

  const setContextToEdit = () => setContext('edit');
  const setContextToDisplay = () => setContext('display');

  const renderCurrentPostContext = () => {
    if (_context === 'create') {
      return (
        <PostCreate
          buttonCreateLabel={buttonCreateLabel}
          editorPlacerholder={editorPlacerholder}
          parentPostId={parentPostId}
        />
      );
    } else if (_context === 'edit') {
      return (
        <PostEdit
          postId={post?.id!}
          initMedias={post?.medias!}
          initRaw={raw}
          setContextToDisplay={setContextToDisplay}
          onCancelEdit={setContextToDisplay}
        />
      );
    } else {
      return (
        <PostDisplay
          postId={post?.id!}
          initRaw={raw}
          initMedias={post?.medias}
        />
      );
    }
  };

  useEffect(() => {
    const clickables = wrapperRef.current?.querySelectorAll(
      'button, a'
    ) as unknown as HTMLElement[];
    clickables?.forEach((el) => {
      // Permet de ne pas bloquer le onClick du bouton avec le lien
      el.style.zIndex = '11';
    });
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative flex items-start px-4 border-b transition-colors hover:bg-slate-50"
      >
        {_context === 'display' && (
          <Link
            href={`/${post?.author?.username}/post/${post?.id}`}
            // Permet de ne pas bloquer les onClick des boutons avec le lien : z-10
            className="absolute top-0 left-0 w-full h-full z-10"
          />
        )}
        <div className="min-w-0 flex-grow">
          <div className="py-4">
            <Profile
              hideCustomMenu={context === 'create'}
              namesDirection="row"
              menu={(button) => {
                return (
                  <PostMenu
                    postId={post?.id!}
                    username={post?.author?.username!}
                    onEdit={setContextToEdit}
                    menuButton={button}
                  />
                );
              }}
              forCurrentUser={{
                avatar: context === 'create',
              }}
              userId={post?.id}
              avatar={post?.author?.profile.profilePicture!}
              username={post?.author?.username}
              displayname={post?.author?.profile.displayname!}
              date={post?.createdAt}
              info={<div className="w-full">{renderCurrentPostContext()}</div>}
            />
          </div>
        </div>
      </div>
      {/* // </ConditionalWrapper> */}
    </>
  );
};

export default Post;
