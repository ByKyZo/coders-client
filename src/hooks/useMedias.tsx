import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type file = File[];

interface IMedias {
  file: file;
  preview: string;
}

interface IUseImageState {
  /**
   * Liste d'images, seulement la premiere nous interesse images[0]
   */
  // medias: medias;
  /**
   * L'URL de la preview de la premiere image
   */
  // previews: string[] | null;
  medias: IMedias[];
}

type UseMediasReturn = [
  IUseImageState,
  Dispatch<SetStateAction<{ medias: file }>>,
  {
    clear: () => void;
  }
];

interface IUseMediasOptions {
  maxFiles?: number;
  onError?: () => void;
}

export const useMedias: (options?: IUseMediasOptions) => UseMediasReturn = (
  options: IUseMediasOptions = {}
) => {
  const [medias, setMedias] = useState<{ medias: file }>({
    medias: [],
  });

  const [state, setState] = useState<IUseImageState>({
    medias: [],
  });

  const clear = useCallback(() => {
    setState({
      medias: [],
    });
  }, []);

  useEffect(() => {
    if (
      options.maxFiles &&
      medias.medias &&
      options.maxFiles < medias.medias.length
    ) {
      setMedias((old) => {
        const news = { ...old };
        // On retire les surplus de fichiers
        news.medias.splice(
          old.medias.length - 1,
          old.medias.length - (options.maxFiles || 0)
        );
        return news;
      });
      options.onError && options.onError();
      return;
    }

    setState((old) => {
      const newState = { ...old };

      const entries: IMedias[] = medias.medias.map((file) => {
        return {
          file: file,
          preview: URL.createObjectURL(file),
        } as unknown as IMedias;
      });

      setState((old) => ({ ...old, medias: [...entries] }));

      return { ...newState };
    });
  }, [medias]);

  return [state, setMedias, { clear }];
};
