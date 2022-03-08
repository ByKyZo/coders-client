import { MdClose } from 'react-icons/md';
import ReactModal, { Props } from 'react-modal';
import Button from '../button/Button';

export interface ModalProps extends Props {
  closeFn?: () => void;
}

interface InternModalProps extends ModalProps {
  title?: string;
  btnAction?: {
    fn: () => void;
    label?: string;
  };
}

const Modal = ({
  title,
  children,
  closeFn,
  btnAction,
  ...rest
}: InternModalProps) => {
  return (
    <ReactModal
      onRequestClose={closeFn}
      overlayClassName="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center items-center"
      className={
        'relative bg-white md:w-[600px] md:h-3/5 h-full w-full flex flex-col'
      }
      {...rest}
    >
      <div className="bg-white backdrop-opacity-60 w-full absolute top-0 left-0 flex justify-between items-center h-12 px-6">
        <div>
          <button
            aria-label={`close ${title || ''} modal`}
            className="mr-6"
            onClick={closeFn}
          >
            <MdClose />
          </button>
          <span className="font-semibold text-xl">{title}</span>
          {/* <Heading title="title" noBorder></Heading> */}
        </div>
        {btnAction && (
          <Button
            as="button"
            styleType="secondary"
            sizeType="medium"
            rounded
            onClick={btnAction.fn}
          >
            {btnAction.label}
          </Button>
        )}
      </div>
      <div className="mt-12 p-6 flex-grow box-border overflow-y-auto">
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
