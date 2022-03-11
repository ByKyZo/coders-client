import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface IUseImageState {
  /**
   * Liste d'images, seulement la premiere nous interesse images[0]
   */
  images: File[] | null;
  /**
   * L'URL de la preview de la premiere image
   */
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

  // useEffect(() => {
  //   if (state.images && state.images[0]) {
  //     setState((old) => ({
  //       ...old,
  //       preview: URL.createObjectURL(state.images![0]),
  //     }));
  //   }
  // }, [state]);

  return [state, setState, reset];
};
