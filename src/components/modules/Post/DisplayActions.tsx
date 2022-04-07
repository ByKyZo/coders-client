import Button from '@components/elements/button/Button';
import React, { useEffect, useState } from 'react';
import { VscComment } from 'react-icons/vsc';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useIsSavedPostQuery } from '../../../graphql/queries/is-saved-post/index.generated';
import { useToggleSavePostMutation } from '../../../graphql/mutations/toggle-save-post/index.generated';
import { toastError } from '../../../helpers/index';
import { useTotalRepliesQuery } from '../../../graphql/queries/get-total-replies/index.generated';
import { useToggleLikeMutation } from '../../../graphql/mutations/like-post/index.generated';
import { useLikeSubscription } from '../../../graphql/subscriptions/like/index.generated';
import { usePostLikeQuery } from '../../../graphql/queries/get-post-likes/index.generated';
import { useIsLikedPostQuery } from '../../../graphql/queries/is-liked-post/index.generated';
import { useGetCurrentUserIdQuery } from '../../../graphql/queries/get-current-userId/index.generated';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
interface IDisplayActionsProps {
  postId: number;
}
const DisplayActions = ({ postId }: IDisplayActionsProps) => {
  const { data: currentUserId } = useGetCurrentUserIdQuery();

  const {
    data: isLikedPost,
    loading: zezelz,
    refetch: refetchIsLikedPost,
  } = useIsLikedPostQuery({
    variables: {
      postId,
    },
  });

  const {
    data: isSavedPost,
    loading: loadQQ,
    refetch,
  } = useIsSavedPostQuery({
    variables: {
      postId,
    },
  });

  const [isLiked, setIsLiked] = useState(Boolean(isLikedPost?.isLikedPost));
  const [isSaved, setisSaved] = useState(Boolean(isSavedPost?.isSavedPost));

  useEffect(() => {
    setisSaved(Boolean(isSavedPost?.isSavedPost));
  }, [isSavedPost]);

  useEffect(() => {
    setIsLiked(Boolean(isLikedPost?.isLikedPost));
  }, [isLikedPost]);

  const { data: totalRepliees } = useTotalRepliesQuery({
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

  const [toggleLikePost] = useToggleLikeMutation({
    variables: {
      postId,
    },
  });

  const handkeToggleLikePost = async () => {
    try {
      setIsLiked((oldState) => !oldState);
      await toggleLikePost();
    } catch {
      setIsLiked((oldState) => !oldState);
    }
  };

  const handkeToggleSavePost = async () => {
    try {
      setisSaved((oldState) => !oldState);
      await toggleSavePost();
    } catch {
      setisSaved((oldState) => !oldState);
    }
  };

  const { data: postLike, refetch: refetchPostLike } = usePostLikeQuery({
    variables: {
      postId,
    },
  });

  useLikeSubscription({
    onSubscriptionData: async (data) => {
      if (data.subscriptionData.data?.toggle_like.post.id === postId) {
        try {
          await refetchPostLike();
        } catch {
          console.log('retch like error');
        }
      }
      if (
        data.subscriptionData.data?.toggle_like.user.id === currentUserId?.me.id
      ) {
        await refetchIsLikedPost();
      }
    },
  });

  return (
    <div className="flex items-center justify-between max-w-[80%]">
      <Button
        icon={<VscComment />}
        disabled
        onlyIcon
        className="pointer-events-none"
        styleType="transparent"
        sizeType="large"
        label={totalRepliees?.post.replies.total!}
        rounded
      />
      {/* <Button
        icon={<AiOutlineRetweet />}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        rounded
      /> */}
      <Button
        icon={
          isLiked ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart />
          )
        }
        // @ts-ignore
        onClick={handkeToggleLikePost}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        label={postLike?.post.likes.total}
        rounded
      />
      <Button
        icon={
          isSaved ? (
            <RiBookmarkFill className="text-gray-900" />
          ) : (
            <RiBookmarkLine />
          )
        }
        onlyIcon
        // @ts-ignore
        onClick={handkeToggleSavePost}
        styleType="transparent"
        sizeType="large"
        rounded
      />
    </div>
  );
};

export default DisplayActions;
