import { useEffect, useState } from 'react';

export const useMount = () => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
    return () => {
      setIsMount(false);
    };
  }, []);

  return isMount;
};
