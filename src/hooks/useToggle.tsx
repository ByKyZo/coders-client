import { useCallback, useState } from 'react';

export const useToggle = () => {
  const [state, setState] = useState(false);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};
