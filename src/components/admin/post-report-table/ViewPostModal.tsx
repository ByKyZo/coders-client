import Button from '@components/elements/button/Button';
import Modal from '@components/elements/modal';
import Post from '@components/modules/Post/Post';
import React, { useState } from 'react';
import { usePostQuery } from '../../../graphql/queries/get-post/index.generated';

interface IViewPostModal {
  postId: number;
}

const ViewPostModal = ({ postId }: IViewPostModal) => {
  const { data: post } = usePostQuery({
    variables: {
      postId,
    },
  });
  const [isOpenViewPost, setIsOpenViewPost] = useState(false);

  const handleOpenViewPost = () => setIsOpenViewPost(true);
  const handleCloseViewPost = () => setIsOpenViewPost(false);

  return (
    <>
      <Modal
        isOpen={isOpenViewPost}
        onRequestClose={handleCloseViewPost}
        closeFn={handleCloseViewPost}
      >
        {post?.post && (
          <Post
            context="display"
            // @ts-ignore
            post={post?.post!}
            //   raw={JSON.parse(JSON.stringify(post?.post?.draftRaw!))}
            raw={JSON.parse(post?.post?.draftRaw!)}
          />
        )}
      </Modal>
      <Button
        onClick={handleOpenViewPost}
        styleType="secondaryOutline"
        sizeType="medium"
      >
        View post
      </Button>
    </>
  );
};

export default ViewPostModal;
