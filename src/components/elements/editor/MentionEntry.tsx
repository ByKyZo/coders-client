import React, { ComponentType } from 'react';
import Link from '@components/elements/link/Link';
import Profile from '@components/modules/profile/Profile';
import { MentionData } from '@draft-js-plugins/mention';
import { SubMentionComponentProps } from '@draft-js-plugins/mention/lib/Mention';

interface EntryProps extends SubMentionComponentProps {
  mention: MentionData & {
    displayname: string;
    username: string;
    profilePicture: string;
  };
}

const MentionEntry: ComponentType<EntryProps | any> = (props) => {
  const { displayname, username, profilePicture } = props.mention;

  return (
    // <Link href={`/${username}`}>
    <div {...props}>
      <Profile
        avatar={profilePicture}
        username={username}
        displayname={displayname}
      />
    </div>
    // </Link>
  );
};

export default MentionEntry;
