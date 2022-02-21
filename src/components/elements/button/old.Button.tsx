import Loader from '@components/elements/loader/Loader';
import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?:
    | 'primary'
    | 'primaryOutline'
    | 'secondary'
    | 'secondaryOutline'
    | 'tertiary'
    | 'tertiaryOutline';
  // | 'link';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  toto?: string;
}

const transitionStyles: any = {
  entering: 'opacity-0 translate-y-8 absolute',
  entered: 'opacity-1 translate-y-0 static',
  exiting: 'opacity-0 -translate-y-8 ',
  exited: 'opacity-0 -translate-y-8 ',
};

const Button = ({
  children,
  className,
  disabled,
  isLoading,
  appearance = 'secondary',
  size = 'medium',
  toto,
  ...rest
}: ButtonProps) => {
  const labelRef = useRef<HTMLSpanElement>(null);
  const loaderRef = useRef<HTMLSpanElement>(null);

  const activeClass =
    !disabled && !isLoading ? 'hover:-translate-y-1 active:translate-y-0' : '';

  const handleClasses = () => {
    let appearanceClass = '';
    const addClasses = (classes: string) => (appearanceClass += ' ' + classes);

    switch (appearance) {
      case 'primary':
        addClasses(`text-white bg-primary hover:shadow-lg`);
        break;
      case 'primaryOutline':
        addClasses(`text-primary ring-1 ring-primary`);
        break;
      case 'secondary':
        break;
      case 'secondaryOutline':
        break;
      default:
    }

    switch (size) {
      case 'small':
        addClasses(`text-sm py-1 px-3`);
        break;
      case 'medium':
        addClasses(`text-base py-2 px-5`);
        break;
      case 'large':
        addClasses(`text-lg py-2 px-7`);
        break;
      default:
    }
    return appearanceClass;
  };

  return (
    <button
      disabled={disabled || isLoading}
      // className={`text-sm transition font-bold text-white ${className} disabled:opacity-70 flex justify-center items-center overflow-hidden`}
      className={`font-sans font-medium transition-[box-shadow,transform] overflow-hidden disabled:bg-opacity-50 ${activeClass} active:shadow-none ${handleClasses()} ${className}`}
      {...rest}
    >
      <span className="relative">
        <Transition
          nodeRef={loaderRef}
          mountOnEnter
          unmountOnExit
          in={isLoading}
          timeout={150}
        >
          {(state: any) => (
            <span
              ref={loaderRef}
              // className={`transition-[opacity_transform] inline-block translate-y-0 ${transitionStyles[state]}`}
              className={`transition-[opacity_transform] h-full w-full flex justify-center translate-y-0 ${transitionStyles[state]}`}
            >
              <Loader
                className="h-full w-full"
                appearance={appearance === 'primary' ? 'secondary' : 'primary'}
                // outerSideClassName="stroke-white"
                // innerSideClassName="stroke-whitee fill-white"
              />
            </span>
          )}
        </Transition>
        <Transition
          nodeRef={labelRef}
          mountOnEnter
          unmountOnExit
          in={!isLoading}
          timeout={150}
        >
          {(state: any) => (
            <span
              ref={labelRef}
              className={`transition-[opacity_transform] inline-block translate-y-0 ${transitionStyles[state]}`}
            >
              {children}
            </span>
          )}
        </Transition>
      </span>
    </button>
  );
};

export default Button;
