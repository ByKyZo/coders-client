import React from 'react';
import Button from '@components/elements/button/Button';
import { VscChromeClose } from 'react-icons/vsc';

interface PostImagesGridProps {
  images: string[] | null;
  context: 'display' | 'edit';
  wrapperClassname?: string;
  /**
   * Call when image delete button is clicked
   */
  onClickDelete?: (index: number) => void;
}

const BASE_WRAPPER_CLASS = 'flex h-72 w-full';
const BASE_IMAGE_CLASS =
  'h-full w-full min-h-0 min-w-0 object-cover rounded-xl ';

const marginSize = {
  display: 1,
  edit: 3,
};

interface GridItemProps {
  context: 'display' | 'edit';
  onClickDelete?: (index: number) => void;
  index: number;
  className?: string;
  src: string;
}

const GridItem = ({
  className,
  context,
  onClickDelete,
  index,
  src,
}: GridItemProps) => {
  return (
    <div className={`relative ${className || ''}`}>
      {context === 'edit' && (
        <Button
          onClick={() => onClickDelete && onClickDelete(index)}
          className="absolute top-4 left-4 bg-opacity-70"
          rounded
          icon={<VscChromeClose />}
          onlyIcon
          styleType="secondary"
          sizeType="medium"
        />
      )}
      <img className={`${BASE_IMAGE_CLASS}`} src={src} alt="post medias" />
    </div>
  );
};

const PostImagesGrid = ({
  images,
  context,
  wrapperClassname,
  onClickDelete,
}: PostImagesGridProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  // NOTE : Permet d'utiliser des classes tailwind dynamiquement en préchargent les classes
  // A Modifier plus tard...
  <div className="d-none mb-1 mb-3"></div>;

  let grid = null;

  if (images.length === 1) {
    grid = (
      <div className="grid">
        <GridItem
          index={0}
          onClickDelete={onClickDelete}
          context={context}
          src={images[0]}
        />
      </div>
    );
  }

  if (images.length === 2) {
    grid = (
      <div className={`${BASE_WRAPPER_CLASS}`}>
        <GridItem
          index={0}
          onClickDelete={onClickDelete}
          context={context}
          className={`w-1/2 mr-${marginSize[context]} min-h-0`}
          src={images[0]}
        />
        <GridItem
          index={1}
          onClickDelete={onClickDelete}
          context={context}
          className="w-1/2 min-h-0"
          src={images[1]}
        />
      </div>
    );
  }

  if (images.length === 3) {
    grid = (
      <div className={`${BASE_WRAPPER_CLASS}`}>
        <GridItem
          index={0}
          onClickDelete={onClickDelete}
          context={context}
          className={`w-1/2 mr-${marginSize[context]} min-h-0`}
          src={images[0]}
        />
        <div className="flex flex-col h-full basis-1/2">
          <GridItem
            index={1}
            onClickDelete={onClickDelete}
            context={context}
            className={`h-1/2 mb-${marginSize[context]} min-h-0`}
            src={images[1]}
          />
          <GridItem
            index={2}
            onClickDelete={onClickDelete}
            context={context}
            className="h-1/2 min-h-0"
            src={images[2]}
          />
        </div>
      </div>
    );
  }

  if (images.length === 4) {
    grid = (
      <div className={`${BASE_WRAPPER_CLASS}`}>
        <div
          className={`flex flex-col h-full basis-1/2 mr-${marginSize[context]}`}
        >
          <GridItem
            index={0}
            onClickDelete={onClickDelete}
            context={context}
            className={`h-1/2 mb-${marginSize[context]} min-h-0`}
            src={images[0]}
          />
          <GridItem
            index={3}
            onClickDelete={onClickDelete}
            context={context}
            className="h-1/2 min-h-0"
            src={images[3]}
          />
        </div>
        <div className="flex flex-col h-full basis-1/2">
          <GridItem
            index={1}
            onClickDelete={onClickDelete}
            context={context}
            className={`h-1/2 mb-${marginSize[context]} min-h-0`}
            src={images[1]}
          />
          <GridItem
            index={2}
            onClickDelete={onClickDelete}
            context={context}
            className="h-1/2 min-h-0"
            src={images[2]}
          />
        </div>
      </div>
    );
  }

  return <div className={wrapperClassname}>{grid}</div>;
};

export default PostImagesGrid;
