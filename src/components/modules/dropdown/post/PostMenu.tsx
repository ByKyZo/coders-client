import Input from '@components/elements/input/Input';
import ConfirmModal from '@components/elements/modal/ConfirmModal';
import ReportPostModal from '@components/modules/confirm-modal/report-post/ReportPostModal';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { useIsCurrentUser } from '@hooks/useIsCurrentUser';
import { Menu, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { useReportPostMutation } from '../../../../graphql/mutations/report-post/index.generated';

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
  const isCurrentUser = useIsCurrentUser({
    username: username,
  });

  // TODO : Bug le menu ne reste pas sur lelement au scroll

  const handleClosePostReportModal = () => {
    setIsOpenPostReportModal(false);
  };
  const handleOpenPostReportModal = () => setIsOpenPostReportModal(true);

  return (
    <>
      <ReportPostModal
        postId={postId}
        isOpen={isOpenPostReportModal}
        onRequestClose={handleClosePostReportModal}
      />
      <Menu menuClassName="w-64" arrow menuButton={menuButton}>
        {isCurrentUser && <MenuItem onClick={onEdit}>Edit</MenuItem>}
        {isCurrentUser && <MenuItem disabled>Delete</MenuItem>}
        {!isCurrentUser && (
          <MenuItem onClick={handleOpenPostReportModal}>Report</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PostMenu;
