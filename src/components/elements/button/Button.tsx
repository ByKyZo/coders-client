import Link from 'next/link';
import * as React from 'react';
import { useRef } from 'react';
import { Transition } from 'react-transition-group';
import Loader from '../loader/Loader';
import {
  ButtonAsButton,
  ButtonAsExternal,
  ButtonAsLink,
  ButtonAsUnstyled,
} from './Types';

const defaultClassName =
  // 'font-sans font-medium transition-[box-shadow,transform] overflow-hidden disabled:bg-opacity-60 hover:-translate-y-1 active:translate-y-0 active:shadow-none';
  'font-sans font-medium transition-[box-shadow,transform] overflow-hidden disabled:bg-opacity-60';

const styles: any = {
  primary: 'text-white bg-primary hover:shadow-lg',
  primaryOutline:
    'text-primary ring-1 ring-primary ring-opacity-40 hover:ring-opacity-100',
};

const sizes: any = {
  small: 'h-6 text-sm py-1 px-3',
  medium: 'h-8 text-base py-1 px-5',
  large: 'h-10 text-base py-2 px-7',
};

const transitionStyles: any = {
  entering: 'opacity-0 translate-y-4 absolute',
  entered: 'opacity-1 translate-y-0 static',
  exiting: 'opacity-0 -translate-y-4',
  exited: 'opacity-0 -translate-y-4',
};

type ButtonProps =
  | ButtonAsButton
  | ButtonAsExternal
  | ButtonAsLink
  | ButtonAsUnstyled;

const Button = (props: ButtonProps): JSX.Element => {
  const idleButtonRef = useRef<HTMLElement>(null);
  const loadingButtonRef = useRef<HTMLElement>(null);

  const allClassNames = `${props.styleType ? styles[props.styleType] : ''}  ${
    props.sizeType ? sizes[props.sizeType] : ''
  } ${props.className ? props.className : ''} ${
    //   props.isLoading ? 'cursor-auto' : ''
    // }`;
    props.isLoading
      ? 'cursor-auto'
      : 'hover:-translate-y-1 active:translate-y-0 active:shadow-none'
  }`;

  if (props.as === 'link') {
    // don't pass unnecessary props to component
    const { className, styleType, sizeType, as, children, ...rest } = props;
    return (
      <Link {...rest}>
        <a
          className={`flex justify-center  items-center ${defaultClassName} ${allClassNames}`}
        >
          {children}
        </a>
      </Link>
    );
  } else if (props.as === 'externalLink') {
    const { className, styleType, sizeType, as, ...rest } = props;
    return (
      <a
        className={`${defaultClassName} ${allClassNames}`}
        // provide good + secure defaults while still allowing them to be overwritten
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {props.children}
      </a>
    );
  } else if (props.as === 'unstyled') {
    const { className, styleType, as, ...rest } = props;
    return <button className={`${className}`} {...rest} />;
  } else {
    const {
      className,
      isLoading,
      styleType,
      disabled,
      sizeType,
      children,
      as,
      ...rest
    } = props;
    return (
      <button
        disabled={disabled}
        className={`inline-flex justify-center items-center ${defaultClassName} ${allClassNames}`}
        {...rest}
      >
        <span className="relative flex justify-center items-center h-full w-full">
          <Transition
            nodeRef={loadingButtonRef}
            mountOnEnter
            unmountOnExit
            in={isLoading}
            timeout={150}
          >
            {(state: any) => (
              <span
                ref={loadingButtonRef}
                data-testid="button-loader"
                // className={`transition-[opacity_transform] inline-block translate-y-0 ${transitionStyles[state]}`}
                className={`transition-[opacity,transform]  h-full w-full flex justify-center translate-y-0 ${transitionStyles[state]}`}
              >
                <Loader
                  className="h-full w-full"
                  appearance={styleType === 'primary' ? 'secondary' : 'primary'}
                  //   appearance={'secondary'}
                />
              </span>
            )}
          </Transition>
          <Transition
            nodeRef={idleButtonRef}
            mountOnEnter
            unmountOnExit
            in={!isLoading}
            timeout={150}
          >
            {(state: any) => (
              <span
                ref={idleButtonRef}
                className={`transition-[opacity,transform] inline-block translate-y-0 ${transitionStyles[state]}`}
              >
                {children}
              </span>
            )}
          </Transition>
        </span>
      </button>
    );
  }
};

export default Button;
