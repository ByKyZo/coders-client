import Button from '@components/elements/button/Button';
import React from 'react';
import { BsBookmark, BsHeart } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { VscComment } from 'react-icons/vsc';
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { useIsSavedPostQuery } from '../../../graphql/queries/is-saved-post/index.generated';
import { useToggleSavePostMutation } from '../../../graphql/mutations/toggle-save-post/index.generated';
import { toastError } from '../../../helpers/index';
import { useTotalRepliesQuery } from '../../../graphql/queries/get-total-replies/index.generated';
import { useToggleLikeMutation } from '../../../graphql/mutations/like-post/index.generated';
import { useLikeSubscription } from '../../../graphql/subscriptions/like/index.generated';
import { usePostLikeQuery } from '../../../graphql/queries/get-post-likes/index.generated';
import { useIsLikedPostQuery } from '../../../graphql/queries/is-liked-post/index.generated';
import { useGetCurrentUserIdQuery } from '../../../graphql/queries/get-current-userId/index.generated';
import { useRouter } from 'next/router';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
interface IDisplayActionsProps {
  postId: number;
}
const DisplayActions = ({ postId }: IDisplayActionsProps) => {
  const { data: currentUserId } = useGetCurrentUserIdQuery();
  const router = useRouter();

  const { data: totalRepliees } = useTotalRepliesQuery({
    variables: {
      postId,
    },
  });

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

  const [toggleLikePost] = useToggleLikeMutation({
    variables: {
      postId,
    },
  });

  const { data: postLike, refetch: refetchPostLike } = usePostLikeQuery({
    variables: {
      postId,
    },
  });

  const { data: isLikedPost, refetch: refetchIsLikedPost } =
    useIsLikedPostQuery({
      variables: {
        postId,
      },
    });

  useLikeSubscription({
    onSubscriptionData: async (data) => {
      console.log('like subscript');

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
          isLikedPost?.isLikedPost ? (
            <AiFillHeart className="text-red-500" />
          ) : (
            <AiOutlineHeart />
          )

          // <BsHeart
          //   className={`${
          //     isLikedPost?.isLikedPost ? ' stroke-blue-500 stroke-[1px]' : ''
          //   }`}
          // />
        }
        // @ts-ignore
        onClick={() => {
          try {
            (async () => {
              await toggleLikePost();
            })();
          } catch (err) {
            // toastError('')
            // router.push('/auth/login');
          }
        }}
        onlyIcon
        styleType="transparent"
        sizeType="large"
        label={postLike?.post.likes.total}
        rounded
      />
      <Button
        icon={
          isSavedPost?.isSavedPost ? (
            <RiBookmarkFill className="text-gray-900" />
          ) : (
            <RiBookmarkLine />
          )
          // <BsBookmark
          //   className={`${
          //     isSavedPost?.isSavedPost ? ' stroke-blue-500 stroke-[1px]' : ''
          //   }`}
          // />
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
