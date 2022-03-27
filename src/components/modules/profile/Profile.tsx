import Button from '@components/elements/button/Button';
import ConditionalWrapper from '@components/elements/conditional-wrapper/ConditionalWrapper';
import FollowButton from '@components/elements/follow-button/FollowButton';
import Link from '@components/elements/link/Link';
import ProfilePicture from '@components/elements/profile-picture/ProfilePicture';
import Username from '@components/elements/username';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';
import { UserQuery } from '@graphql/queries/get-user/index.generated';
import React, { useEffect } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { User } from 'types';
import Displayname from '../../elements/displayname';
import ProfileMenu from '@components/modules/dropdown/profile/ProfileMenu';
import useMutationObserver from '@rooks/use-mutation-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
interface ProfileProps {
  /**
   * Si le user n'est pas défini ce sera le user connecté qui sera affiché
   */
  userId?: number;
  avatar?: string;
  username?: string;
  displayname?: string;
  date?: string;

  forCurrentUser?: {
    avatar?: boolean;
    username?: boolean;
    displayname?: boolean;
  };
  padding?: 'none' | 'small' | 'medium' | 'large';
  avatarOnly?: boolean;
  infosOnly?: boolean;
  withFollow?: boolean;
  withLink?: boolean;
  withMenuIcon?: boolean;
  withMenu?: boolean;
  hideCustomMenu?: boolean;
  menu?: (arg: JSX.Element) => JSX.Element;
  // infoIsBio?: boolean;
  bio?: string;
  namesDirection?: 'row' | 'column';
  info?: string | React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyle: any = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl',
};

const namesDirectionClass: any = {
  row: 'items-center',
  column: 'flex-col',
};
const paddingStyle: any = {
  none: 'p-0',
  small: 'p-1',
  medium: 'p-2',
  large: 'p-3',
};

const Profile = ({
  userId,
  avatar,
  username,
  displayname,
  date,
  info,
  bio,
  forCurrentUser,

  hideCustomMenu,
  padding = 'none',
  menu,
  avatarOnly,
  withLink,
  withFollow,
  withMenu,
  namesDirection = 'column',
}: ProfileProps) => {
  const { data: meData } = useMeQuery();
  const profileBodyRef = React.useRef<HTMLDivElement>(null);

  const toDisplay = {
    avatar: forCurrentUser?.avatar
      ? meData?.me?.profile.profilePicture
      : avatar,
    username: forCurrentUser?.username ? meData?.me?.username : username,
    displayname: forCurrentUser?.displayname
      ? meData?.me?.profile?.displayname
      : displayname,
    date: date,
    info: info,
  };

  if (!toDisplay.username && withLink) {
    throw new Error('You must provide a username for use props "withLink"');
  }

  if (!userId && withFollow) {
    throw new Error('You must provide a userId for use props "withFollow"');
  }

  const body = (
    <div
      className={`flex min-w-0 justify-start items-center relative ${paddingStyle[padding]}`}
    >
      <div className="flex items-start flex-grow max-w-full">
        {toDisplay.avatar && (
          <ProfilePicture size="small" url={toDisplay.avatar} />
        )}
        {!avatarOnly && (
          <div className="flex min-w-0 flex-grow">
            <div className={`ml-3 w-full text-left `}>
              <div ref={profileBodyRef} className={`flex justify-between`}>
                <div
                  className={`flex min-w-0 ${namesDirectionClass[namesDirection]}`}
                >
                  {toDisplay.displayname && (
                    <Link withHover href={`/${toDisplay.username}`}>
                      <Displayname
                        className={`${namesDirection === 'row' ? 'mr-1' : ''}`}
                      >
                        {toDisplay.displayname}
                      </Displayname>
                    </Link>
                  )}
                  {toDisplay.username && (
                    <Link href={`/${toDisplay.username}`}>
                      <Username>{toDisplay.username}</Username>
                    </Link>
                  )}
                  {toDisplay.date && (
                    <>
                      <span className="mx-2">-</span>
                      <span className="text-sm text-gray-600">
                        {toDisplay.date && dayjs(toDisplay.date).fromNow()}
                      </span>
                    </>
                    // {dayjs(toDis).fromNow()}
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {withFollow && userId && (
                    <FollowButton sizeType="small" followingId={userId} />
                  )}
                  {withMenu && username && userId && (
                    <ProfileMenu
                      username={username}
                      userId={userId}
                      menuButton={
                        <button>
                          <BiDotsHorizontalRounded className="h-6 w-6 text-gray-800" />
                        </button>
                      }
                    />
                  )}
                  {!hideCustomMenu &&
                    menu &&
                    menu(
                      <button>
                        <BiDotsHorizontalRounded className="h-6 w-6 text-gray-800" />
                      </button>
                    )}
                </div>
              </div>

              {bio && <p className="mt-1 text-sm">{bio}</p>}
              {info && <div className="block">{info}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return body;
};
// const Profile = ({
//   avatarOnly,
//   infosOnly,
//   withFollow,
//   withMenu,
//   user,
//   info,
//   namesDirection = 'column',
// }: ProfileProps) => {
//   const me = useMeQuery().data?.me;
//   const userDisplay = user || me;
//   console.log('from profile : ', user);
//   const body = (
//     <div className={`-z-10 flex justify-start items-center relative`}>
//       <ConditionalWrapper
//         condition={!!withFollow}
//         wrapper={(children) => (
//           <Link
//             className="block p-3 w-full hover:bg-gray-200 transition-colors relative"
//             href={`/${user?.username}`}
//           >
//             {children}
//           </Link>
//         )}
//       >
//         <div className="flex items-center flex-grow max-w-full">
//           {!infosOnly && (
//             // <ProfilePicture size="small" url={data?.me.profile.profilePicture!} />
//             <ProfilePicture
//               size="small"
//               url={userDisplay?.profile?.profilePicture}
//             />
//           )}
//           {!avatarOnly && (
//             <div className="flex min-w-0">
//               <div
//                 className={`ml-3 flex w-full text-left ${namesDirectionClass[namesDirection]}`}
//               >
//                 <Displayname
//                   className={`${namesDirection === 'row' ? 'mr-1' : ''}`}
//                 >
//                   {userDisplay?.profile?.displayname}
//                 </Displayname>
//                 <Username>{userDisplay?.username}</Username>
//               </div>
//               <p>{info}</p>
//             </div>
//           )}
//         </div>
//       </ConditionalWrapper>
//       <div className="absolute right-0 flex items-center space-x-2 pr-3">
//         {withFollow && (
//           <FollowButton sizeType="small" followingId={user?.id!} />
//         )}
//         {withMenu && (
//           <ProfileMenu
//             username={user?.username!}
//             userId={user?.id!}
//             menuButton={
//               <button>
//                 <BiDotsHorizontalRounded className="h-6 w-6 text-gray-800" />
//               </button>
//             }
//           />
//         )}
//       </div>
//     </div>
//   );

//   return body;
// };

export default Profile;
