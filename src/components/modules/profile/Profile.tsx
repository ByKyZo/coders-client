import ProfilePicture from '@components/elements/profile-picture/ProfilePicture';
import Username from '@components/elements/username';
import { useMeQuery } from '@graphql/users/get-me/index.generated';
import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import Displayname from '../../elements/displayname';

interface ProfileProps {
  avatarOnly?: boolean;
  infosOnly?: boolean;
  withButtonFollow?: boolean;
  withMenuIcon?: boolean;
  // noIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
  userID?: string;
}

const sizeStyle: any = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl',
};

const Profile = ({
  avatarOnly,
  infosOnly,
  withMenuIcon,
  size = 'medium',
}: ProfileProps) => {
  // const { data, loading } = useQuery<MeQuery>(getMyProfile);
  const { data, loading } = useMeQuery();

  if (loading) return null;

  return (
    <div className={`flex justify-start items-center w-full `}>
      <div className="flex flex-grow max-w-full">
        {!infosOnly && (
          <ProfilePicture size="small" url={data?.me.profile.profilePicture!} />
        )}
        {!avatarOnly && (
          <div
            className={`ml-3  min-w-0 flex flex-col justify-center leading-5 text-left `}
          >
            <Displayname>{data?.me?.profile?.displayname!}</Displayname>
            <Username size="small">{data?.me.username}</Username>
          </div>
        )}
      </div>
      {!avatarOnly && (
        <BiDotsHorizontalRounded className="h-6 w-6 text-gray-800" />
      )}
    </div>
    // </div>
  );
};

export default Profile;
