import Input from '@components/elements/input/Input';
import ConfirmModal from '@components/elements/modal/ConfirmModal';
import ReportPostModal from '@components/modules/confirm-modal/report-post/ReportPostModal';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { useIsCurrentUser } from '@hooks/useIsCurrentUser';
import { Menu, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { useReportPostMutation } from '../../../../graphql/mutations/report-post/index.generated';
import { useDeletePostMutation } from '../../../../graphql/mutations/delete-post/index.generated';
import { toastError, toastInfo } from '../../../../helpers/index';

interface MyProfileMenuProps {
  postId: number;
  username: string;
  menuButton: JSX.Element;
  onEdit: () => void;
}

const PostMenu = ({
  username,
  menuButton,
  onEdit,
  postId,
}: MyProfileMenuProps) => {
  const [isOpenPostReportModal, setIsOpenPostReportModal] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const isCurrentUser = useIsCurrentUser({
    username: username,
  });
  const { data } = useMeQuery();

  // TODO : Bug le menu ne reste pas sur lelement au scroll

  const handleClosePostReportModal = () => {
    setIsOpenPostReportModal(false);
  };
  const handleOpenPostReportModal = () => setIsOpenPostReportModal(true);

  const handleDeletePost = async () => {
    try {
      await deletePost({
        variables: {
          postId,
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
      <ReportPostModal
        postId={postId}
        isOpen={isOpenPostReportModal}
        onRequestClose={handleClosePostReportModal}
      />
      <Menu menuClassName="w-64" arrow menuButton={menuButton}>
        {isCurrentUser && <MenuItem onClick={onEdit}>Edit</MenuItem>}
        {isCurrentUser && (
          <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
        )}
        {data?.me && !isCurrentUser && (
          <MenuItem onClick={handleOpenPostReportModal}>Report</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PostMenu;
