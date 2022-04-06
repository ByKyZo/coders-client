import Button from '@components/elements/button/Button';
import React, { useEffect } from 'react';
import { ImImage } from 'react-icons/im';

interface EditActionsProps {
  context: 'edit' | 'create';
  loading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setToolbarRef: (arg: HTMLDivElement) => void;
  disabledCreatePost: boolean;
  onCreatePost: () => void;
  onCancelEdit?: () => void;
  buttonCreateLabel?: string;
}

const EditActions = ({
  inputRef,
  loading,
  setToolbarRef,
  onCreatePost,
  onCancelEdit,
  context,
  buttonCreateLabel,
  disabledCreatePost,
}: EditActionsProps) => {
  return (
    <>
      <hr className="border-gray-200 my-2" />

      <div className="py-4 flex items-center justify-between">
        {/* 
      NOTE : Le button emoji est ajouté par le composant <Editor />
      parceque la librairie est mal faite
    */}
        <div ref={setToolbarRef} id="post-editor-toolbar" className="space-x-2">
          <Button
            icon={<ImImage />}
            onClick={() => {
              inputRef.current?.click();
            }}
            onlyIcon
            rounded
            styleType="primaryOutline"
            sizeType="medium"
          />
        </div>
        <div className="space-x-2">
          {context === 'edit' && (
            <Button
              onClick={onCancelEdit}
              styleType="secondaryOutline"
              sizeType="medium"
              rounded
            >
              Cancel
            </Button>
          )}

          <Button
            isLoading={loading}
            onClick={onCreatePost}
            styleType="primary"
            sizeType="medium"
            disabled={disabledCreatePost}
            rounded
          >
            {buttonCreateLabel
              ? buttonCreateLabel
              : context === 'edit'
              ? 'Save'
              : 'Tweet'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditActions;
