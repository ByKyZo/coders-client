import Button from '@components/elements/button/Button';
import React from 'react';
import { BsBookmark, BsHeart } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { VscComment } from 'react-icons/vsc';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { useIsSavedPostQuery } from '../../../graphql/queries/is-saved-post/index.generated';
import { useToggleSavePostMutation } from '../../../graphql/mutations/toggle-save-post/index.generated';
import { toastError } from '../../../helpers/index';
interface IDisplayActionsProps {
  postId: number;
}
const DisplayActions = ({ postId }: IDisplayActionsProps) => {
  const { data: isSavedPost, refetch } = useIsSavedPostQuery({
    variables: {
      postId,
    },
  });
  const [toggleSavePost] = useToggleSavePostMutation({
    variables: {
      postId,
    },
    onCompleted: async () => {
      try {
        await refetch();
      } catch {
        toastError('Error while saving post');
      }
    },
  });

  return (
    <div className="flex items-center justify-between max-w-[80%]">
      <Button
        icon={<VscComment />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
      <Button
        icon={<AiOutlineRetweet />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
      <Button
        icon={<BsHeart />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      />
      <Button
        icon={
          <BsBookmark
            className={`${
              isSavedPost?.isSavedPost ? ' stroke-blue-500 stroke-[1px]' : ''
            }`}
          />
        }
        onlyIcon
        // @ts-ignore
        onClick={toggleSavePost}
        styleType="transparent"
        sizeType="large"
        rounded
      />
    </div>
  );
};

export default DisplayActions;
