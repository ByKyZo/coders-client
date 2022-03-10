import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface IUseImageState {
  images: File[] | null;
  preview: string | null;
}

type UseImageReturn = [
  IUseImageState,
  Dispatch<SetStateAction<IUseImageState>>,
  () => void
];

export const useImage: () => UseImageReturn = () => {
  const [state, setState] = useState<IUseImageState>({
    images: null,
    preview: null,
  });

  const reset = useCallback(() => {
    setState({
      images: null,
      preview: null,
    });
  }, []);

  return [state, setState, reset];
};
