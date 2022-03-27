import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRedirectOnMount = (to: string) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, []);
};
