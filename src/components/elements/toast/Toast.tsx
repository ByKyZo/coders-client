import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import {
  RiErrorWarningFill,
  RiForbid2Fill,
  RiInformationFill,
} from 'react-icons/ri';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface IProps {
  type: ToastType;
  content?: string;
}

const Toast = ({ type, content }: IProps) => {
  const handleToastIcon = () => {
    const toastClassName = '__toast-icon text-3xl mr-3 flex-shrink-0';
    switch (type) {
      case 'error':
        return <RiForbid2Fill className={toastClassName} />;
      case 'success':
        return <IoCheckmarkCircle className={toastClassName} />;
      case 'warning':
        return <RiErrorWarningFill className={toastClassName} />;
      case 'info':
        return <RiInformationFill className={toastClassName} />;
      default:
        throw new Error('Missing toast type');
    }
  };

  return (
    <div className="flex items-center">
      {handleToastIcon()}
      <span className="__toast-message font-sans">{content}</span>
    </div>
  );
};

export default Toast;
