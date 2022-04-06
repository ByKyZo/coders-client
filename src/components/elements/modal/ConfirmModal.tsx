import { MdClose } from 'react-icons/md';
import ReactModal, { Props } from 'react-modal';
import Button from '../button/Button';

interface InternModalProps extends Props {
  title?: string;
  sentence?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmModal = ({
  title,
  children,
  sentence,
  onRequestClose,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  ...rest
}: InternModalProps) => {
  return (
    <ReactModal
      onRequestClose={onRequestClose}
      overlayClassName="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center items-center z-50"
      className={'relative bg-white md:w-[600px] w-full flex flex-col'}
      {...rest}
    >
      <div className="p-6 box-border overflow-y-auto">
        <p className="mb-6">{sentence}</p>
        <div>{children}</div>
      </div>
      <div className="bg-white w-full flex justify-end space-x-3 items-center p-6">
        <Button
          as="button"
          styleType="secondaryOutline"
          sizeType="medium"
          rounded
          onClick={onRequestClose}
        >
          {cancelLabel || 'Cancel'}
        </Button>
        <Button
          as="button"
          styleType="secondary"
          sizeType="medium"
          rounded
          onClick={onConfirm}
        >
          {confirmLabel || 'OK'}
        </Button>
      </div>
    </ReactModal>
  );
};

export default ConfirmModal;
