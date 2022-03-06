import Button from '@components/elements/button/Button';
import Displayname from '@components/elements/displayname';
import Link from '@components/elements/link/Link';
import Username from '@components/elements/username';
import { UserQuery } from '@graphql/users/get-user/index.generated';
import { useRouter } from 'next/router';
import React from 'react';

interface ProfileHeaderProps {
  user?: UserQuery;
}

interface NavItemProps {
  label: string;
  href: string;
}

const NavItem = ({ label, href }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li className="flex-grow">
      <Link
        className="w-full h-12 flex justify-center items-center relative hover:bg-gray-200 "
        href={href}
      >
        <span
          className={`before:absolute before:bottom-0 before:h-1 ${
            isActive ? 'before:bg-red-600' : 'before:bg-transparent'
          }  before:w-full`}
        >
          Tweets
        </span>
      </Link>
    </li>
  );
};

const ProfileHeader = ({ user: userData }: ProfileHeaderProps) => {
  const user = userData?.user;
  const router = useRouter();

  if (!user)
    return (
      <>
        Not Found
        <button onClick={() => router.back()}>Go back</button>
      </>
    );

  return (
    <div>
      <div className="h-56 bg-gray-300 relative">
        <img
          className="absolute left-4 bottom-0 translate-y-1/2 h-auto  w-3/12 rounded-full"
          src="https://picsum.photos/300/300"
          alt=""
        />
      </div>
      <div>
        <div className="p-6 pb-0 mb-8">
          <div className="flex justify-end h-16">
            <Button as="button" styleType="primaryOutline" sizeType="small">
              Edit profile
            </Button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mb-3">
              <Displayname size="large">
                {user.profile?.displayname!}
              </Displayname>
              <Username>{user.username}</Username>
            </div>
            <div className="flex">
              <span className="mr-4">
                <strong>99</strong>
                <span>Following</span>
              </span>
              <span>
                <strong>99</strong>
                <span>Followers</span>
              </span>
            </div>
          </div>
        </div>

        <nav className="">
          <ul className="flex justify-between border-b border-b-gray-200">
            <NavItem label="tweets" href={`/${user}/tweets`} />
            <NavItem label="tweets" href={`/${user}/tweets`} />
            <NavItem label="tweets" href={`/${user}/tweets`} />
            <NavItem label="tweets" href={`/${user}/tweets`} />
            {/* <li>Tweets & Replies</li>
              <li>Media</li>
              <li>Likes</li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProfileHeader;
