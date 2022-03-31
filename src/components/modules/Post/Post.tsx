import React, { useState } from 'react';
import Profile from '@components/modules/profile/Profile';
import { Editor, RawDraftContentState } from 'draft-js';

import PostMenu from '@components/modules/dropdown/post/PostMenu';
import { PostMedia } from 'types';
import PostEdit from './PostEdit';
import PostCreate from './PostCreate';
import PostDisplay from './PostDisplay';
import { Post as PostType } from 'types';

interface IPostProps {
  context: 'display' | 'edit' | 'create';
  raw?: RawDraftContentState;
  post?: Partial<PostType>;
  onCreatePost?: () => void;
}

const Post = ({
  context,
  raw = { blocks: [], entityMap: {} },
  post,
}: IPostProps) => {
  if (!post?.id && (context === 'display' || context === 'edit')) {
    throw new Error('Post id is required on create or edit context');
  }

  const [_context, setContext] = useState(context);

  const setContextToEdit = () => setContext('edit');
  const setContextToDisplay = () => setContext('display');

  const renderCurrentPostContext = () => {
    if (_context === 'create') {
      return <PostCreate />;
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
  );
};

export default Post;
