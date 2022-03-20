import { useMemo } from 'react';
import { useMeQuery } from '@graphql/queries/get-me/index.generated';

interface UseIsCurrentUserArgs {
  id?: string;
  username?: string;
}

export const useIsCurrentUser = ({ id, username }: UseIsCurrentUserArgs) => {
  const { data } = useMeQuery();

  const isCurrentUser = useMemo(() => {
    // console.log('me : ', data);
    // console.log('id : ', id);
    // console.log('username : ', username);
    return (
      (data?.me.username &&
        data?.me.username.toLowerCase() == username?.toLowerCase()) ||
      (data?.me.id && (data?.me.id as unknown as string) === id)
    );
  }, [data, id, username]);

  return isCurrentUser;
};
