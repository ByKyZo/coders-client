import BackgroundPicture from '@components/elements/background-picture/BackgroundPicture';
import Button from '@components/elements/button/Button';
import Displayname from '@components/elements/displayname';
import Link from '@components/elements/link/Link';
import Username from '@components/elements/username';
import EditProfileModal from '@components/modules/EditProfileModal/EditProfileModal';
import { UserQuery } from '@graphql/queries/get-user/index.generated';
import { useToggleFollowMutation } from '@graphql/mutations/toggle-follow/index.generated';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { useIsCurrentUser } from '@hooks/useIsCurrentUser';
import ProfilePicture from '@components/elements/profile-picture/ProfilePicture';
import AppLayout from './AppLayout';
import { useUserQuery } from '@graphql/queries/get-user/index.generated';
import { useIsFollowQuery } from '@graphql/queries/is-follow/index.generated';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import HorizontalTabItem from '@components/elements/horizontal-tab-item/HorizontalTabItem';
import { NextComponent } from '@typescript/index';
import { useFollowSubscription } from '@graphql/subscriptions/follow/index.generated';
import FollowButton from '@components/elements/follow-button/FollowButton';

interface ProfileLayoutProps {
  data?: UserQuery;
  error?: any;
  children: React.ReactNode;
}

//? Ssr : Server side rendering
//? Csr : Client side rendering

// TODO: Optimiser les requetes / hooks
const ProfileLayout: NextComponent<ProfileLayoutProps> = ({
  data: userSsr,
  error,
  children,
}) => {
  const [isOpenEditProfileModal, setIsOpenProfileModal] = useState(false);
  // On recupere également le meme user coté client pour pouvoir afficher les followers en temps réel
  const { data: userCsr, refetch } = useUserQuery({
    variables: { username: userSsr?.user.username! },
  });

  // On récupere le user connecté pour faire du rendu conditonnel
  const { data: meData } = useMeQuery();

  // Socket qui ecoute les follows
  useFollowSubscription({
    onSubscriptionData: () => {
      /**
       * On refetch a chaque fois que le socket follow est envoyé
       * Le refetch recupere le cache mit a jour par le socket
       */
      refetch();
    },
  });

  const usernameRouterParams = useRouter().query.username as string;
  const isCurrenUser = useIsCurrentUser({
    username: usernameRouterParams,
  });

  const userSsrMemo = useMemo(() => userSsr?.user, [userSsr]);
  const userCsrMemo = useMemo(() => userCsr?.user, [userCsr]);

  const handleOpenEditProfileModal = () => {
    setIsOpenProfileModal(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsOpenProfileModal(false);
  };

  return (
    <>
      <EditProfileModal
        isOpen={isOpenEditProfileModal}
        closeFn={handleCloseEditProfileModal}
      />
      <div>
        <div className="relative">
          <BackgroundPicture url={userSsrMemo?.profile?.backroundPicture!} />
          <ProfilePicture
            size="large"
            className="absolute left-4 bottom-0 translate-y-1/2"
            url={userSsrMemo?.profile?.profilePicture!}
          />
        </div>
        <div>
          <div className="p-6 pb-0 mb-8">
            <div className="flex justify-end h-16">
              {meData &&
                userCsr &&
                (!isCurrenUser ? (
                  <FollowButton followingId={userSsrMemo?.id!} />
                ) : (
                  <Button
                    as="button"
                    onClick={handleOpenEditProfileModal}
                    styleType="secondaryOutline"
                    sizeType="medium"
                    rounded
                  >
                    Edit Profile
                  </Button>
                ))}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col mb-3">
                {userSsrMemo ? (
                  <>
                    <Displayname size="large">
                      {userSsrMemo?.profile?.displayname!}
                    </Displayname>
                    <Username>{userSsrMemo?.username}</Username>
                    {userSsrMemo?.profile?.bio && (
                      <p className="mt-2">{userSsrMemo.profile.bio}</p>
                    )}
                    <span className="flex items-center mt-2 text-sm text-gray-500">
                      <MdDateRange className="mr-1 text-xl" />
                      <span>
                        Joined{' '}
                        {dayjs(userSsrMemo?.createdAt).format('MMMM YYYY')}
                      </span>
                    </span>
                    <div className="flex mt-2">
                      <Link
                        withHover
                        href={`/${usernameRouterParams}/followings`}
                        className="mr-4"
                      >
                        <strong className="mr-1">
                          {userCsrMemo?.followings?.total}
                        </strong>
                        <span>Following</span>
                      </Link>
                      <Link
                        withHover
                        href={`/${usernameRouterParams}/followers`}
                      >
                        <strong className="mr-1">
                          {userCsrMemo?.followers?.total}
                        </strong>
                        <span>Followers</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <Username size="large">{usernameRouterParams}</Username>
                )}
              </div>
            </div>
          </div>
          {userSsrMemo && (
            <nav className="">
              <ul className="flex justify-between">
                <HorizontalTabItem href={`/${userSsrMemo?.username}`}>
                  Tweets
                </HorizontalTabItem>
                <HorizontalTabItem
                  href={`/${userSsrMemo?.username}/with_replies`}
                >
                  Tweets & Replies
                </HorizontalTabItem>
                <HorizontalTabItem
                  username={userSsrMemo?.username}
                  href={`/${userSsrMemo?.username}/followings`}
                >
                  Media
                </HorizontalTabItem>
                <HorizontalTabItem
                  username={userSsrMemo?.username}
                  href={`/${userSsrMemo?.username}/followings`}
                >
                  Likes
                </HorizontalTabItem>
              </ul>
            </nav>
          )}
        </div>
        {userSsrMemo ? (
          children
        ) : (
          <p className="text-2xl text-center px-4">
            This account doesn’t exist
          </p>
        )}
      </div>
    </>
  );
};

export const getProfileLayout = (page: React.Component<ProfileLayoutProps>) => {
  return (
    <AppLayout>
      <ProfileLayout {...page.props}>{page}</ProfileLayout>
    </AppLayout>
  );
};

export default ProfileLayout;
