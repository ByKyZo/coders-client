import { useQuery } from '@apollo/client';
import { getMyProfile } from '@graphql/queries/get-my-profile/get-my-profile';
import { MeQuery } from '@graphql/queries/get-my-profile/get-my-profile.generated';
import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface ProfileProps {
  inHeader?: boolean;
  avatarOnly?: boolean;
}

const Profile = ({ inHeader, avatarOnly }: ProfileProps) => {
  const { data, loading } = useQuery<MeQuery>(getMyProfile);

  if (loading) return null;

  return (
    // <div className="">
    <div className="px-1 flex justify-between items-center w-full">
      <div className="flex">
        <img
          className="h-10 w-10 rounded-full"
          src="https://picsum.photos/200/300"
          alt="picture"
        />
        {!avatarOnly && (
          <div className="ml-3 flex flex-col leading-5">
            <span className="font-bold text-gray-800">
              {data?.me.profile.displayname || data?.me.username}
            </span>
            <span>
              <span className="text-gray-400">@</span>
              <span className="text-sm text-gray-400">{data?.me.username}</span>
            </span>
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
