import Button from '@components/elements/button/Button';
import ConditionalWrapper from '@components/elements/conditional-wrapper/ConditionalWrapper';
import FollowButton from '@components/elements/follow-button/FollowButton';
import Link from '@components/elements/link/Link';
import ProfilePicture from '@components/elements/profile-picture/ProfilePicture';
import Username from '@components/elements/username';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { UserQuery } from '@graphql/queries/get-user/index.generated';
import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { User } from 'types';
import Displayname from '../../elements/displayname';
import ProfileMenu from '@components/modules/dropdown/profile/ProfileMenu';

interface ProfileProps {
  /**
   * Si le user n'est pas défini ce sera le user connecté qui sera affiché
   */
  user?: User;
  avatarOnly?: boolean;
  infosOnly?: boolean;
  withFollow?: boolean;
  withMenuIcon?: boolean;
  withMenu?: boolean;
  namesDirection?: 'row' | 'column';
  info?: string;
  size?: 'small' | 'medium' | 'large';
  userID?: string;
}

const sizeStyle: any = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl',
};

const namesDirectionClass: any = {
  row: 'justify-center',
  column: 'justify-center flex-col',
};

const Profile = ({
  avatarOnly,
  infosOnly,
  withFollow,
  withMenu,
  user,
  info,
  namesDirection = 'column',
}: ProfileProps) => {
  const me = useMeQuery().data?.me;
  const userDisplay = user || me;

  const body = (
    <div className={`-z-10 flex justify-start items-center relative`}>
      <ConditionalWrapper
        condition={!!withFollow}
        wrapper={(children) => (
          <Link
            className="block p-3 w-full hover:bg-gray-200 transition-colors relative"
            href={`/${user?.username}`}
          >
            {children}
          </Link>
        )}
      >
        <div className="flex items-center flex-grow max-w-full">
          {!infosOnly && (
            // <ProfilePicture size="small" url={data?.me.profile.profilePicture!} />
            <ProfilePicture
              size="small"
              url={userDisplay?.profile?.profilePicture}
            />
          )}
          {!avatarOnly && (
            <div className="flex min-w-0">
              <div
                className={`ml-3 flex w-full text-left ${namesDirectionClass[namesDirection]}`}
              >
                <Displayname
                  className={`${namesDirection === 'row' ? 'mr-1' : ''}`}
                >
                  {userDisplay?.profile?.displayname}
                </Displayname>
                <Username>{userDisplay?.username}</Username>
              </div>
              <p>{info}</p>
            </div>
          )}
        </div>
      </ConditionalWrapper>
      <div className="absolute right-0 flex items-center space-x-2 pr-3">
        {withFollow && (
          <FollowButton sizeType="small" followingId={user?.id!} />
        )}
        {withMenu && (
          <ProfileMenu
            username={user?.username!}
            userId={user?.id!}
            menuButton={
              <button>
                <BiDotsHorizontalRounded className="h-6 w-6 text-gray-800" />
              </button>
            }
          />
        )}
      </div>
    </div>
  );

  return body;
};
export default Profile;
