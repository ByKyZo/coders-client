import { useCallback, useState } from 'react';

/**
 *
 * @returns Ref qui fait des rendu
 */
export const useRefUpdate = <T extends unknown>(): [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>
] => {
  const [stateRef, setStateRef] = useState<T | null>(null);
  const setRef = useCallback((node) => {
    if (node) {
      setStateRef(node);
    }
  }, []);
  return [stateRef, setRef];
};
