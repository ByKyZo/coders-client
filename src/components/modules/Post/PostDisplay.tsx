import React from 'react';

import PostImagesGrid from '@components/elements/post-images-grid/PostImagesGrid';
import Editor from '@components/elements/editor/Editor';
import { RawDraftContentState } from 'draft-js';
import DisplayActions from './DisplayActions';

import { PostMedia } from 'types';

interface IPostProps {
  initRaw?: RawDraftContentState;
  initMedias?: Omit<PostMedia, '__typename' | 'PostEdit'>[];
  postId: number;
}

const PostDisplay = ({
  postId,
  initRaw = { blocks: [], entityMap: {} },
  initMedias,
}: IPostProps) => {
  return (
    <div className="w-full">
      <Editor wrapperClassname="mt-2" readOnly={true} initRaw={initRaw} />

      <PostImagesGrid
        wrapperClassname="mt-2"
        context={'display'}
        images={initMedias?.map((m) => m.path)!}
      />
      <div className="mt-2">
        <DisplayActions postId={postId} />
      </div>
    </div>
  );
};

export default PostDisplay;
