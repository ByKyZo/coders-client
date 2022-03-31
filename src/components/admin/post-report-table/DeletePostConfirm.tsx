import Button from '@components/elements/button/Button';
import ConfirmModal from '@components/elements/modal/ConfirmModal';
import { useDeletePostMutation } from '@graphql/mutations/delete-post/index.generated';
import { toastInfo, toastError } from '@helpers/index';
import React, { useState } from 'react';

interface IDeletePostConfirm {
  postId: number;
}

const DeletePostConfirm = ({ postId }: IDeletePostConfirm) => {
  const [deletePost] = useDeletePostMutation();
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setIsOpenConfirmDelete(false);

  const handleOpenConfirmDelete = () => {
    console.log('handleCloseConfirmDelete');
    setIsOpenConfirmDelete(true);
  };
  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost({
        variables: {
          postId: postId,
        },
        update: (cache) => {
          const normalizedId = cache.identify({
            id: postId,
            __typename: 'Post',
          });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });
      toastInfo('Post successfully deleted');
    } catch {
      toastError('Error while deleting post');
    }
  };
  return (
    <>
      <ConfirmModal
        isOpen={isOpenConfirmDelete}
        onConfirm={() => handleDeletePost(postId)}
        onRequestClose={handleCloseConfirmDelete}
        sentence={`Are you sure delete post with id : ${postId} ?`}
      />
      <Button
        onClick={handleOpenConfirmDelete}
        styleType="secondaryOutline"
        sizeType="medium"
      >
        Delete post
      </Button>
    </>
  );
};

export default DeletePostConfirm;
