import Heading from '@components/elements/heading/Heading';
import HorizontalTabItem from '@components/elements/horizontal-tab-item/HorizontalTabItem';
import { useRouter } from 'next/router';
import React from 'react';

/**
 * TODO : Créer une logique réutilisable entre les pages : followers / followings
 */

interface FollowLayout {
  children: React.ReactNode;
  headingTitle: string;
  // /**
  //  * Liste des followers ou follows
  //  */
  // // dataType: 'followers' | 'follows';
  // dataType: 'followers' | 'followings';
  // // data: User[];
  // data: FollowersQuery['user']['followers']['list'];
  // refetch: (arg: FollowersQueryVariables) => Promise<any>;
}

const FollowLayout = ({ headingTitle, children }: FollowLayout) => {
  const router = useRouter();
  const usernameParams = router.query.username as string;

  return (
    <div>
      <Heading
        withGoBackCallback={() => router.push(`/${usernameParams}`)}
        title={headingTitle}
      />
      <ul className="flex">
        <HorizontalTabItem href={`/${usernameParams}/followings`}>
          Followings
        </HorizontalTabItem>
        <HorizontalTabItem href={`/${usernameParams}/followers`}>
          Followers
        </HorizontalTabItem>
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default FollowLayout;
