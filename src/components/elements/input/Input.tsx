import React, { useEffect, useRef, useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { IoAlertSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { NextComponent } from '../../../typescript/index';

// ? La logique de style des inputs se trouve dans le fichier scss (components/auth/input.scss)
// interface IProps extends React.HTMLProps<HTMLInputElement> {
//   error?: string | undefined;
//   isTouched?: boolean;
//   id: string;
// }

type BaseInputProps = {
  error?: string | undefined;
  isTouched?: boolean;
  id: string;
};

type InputAsTextarea = BaseInputProps &
  Omit<React.HTMLProps<HTMLTextAreaElement>, keyof BaseInputProps> & {
    as?: 'texarea';
  };

type InputAsInput = BaseInputProps &
  Omit<React.HTMLProps<HTMLInputElement>, keyof BaseInputProps> & {
    as?: 'input';
  };

// HTMLTextAreaElement;
// type InputAsTextarea = '';

type InputProps = InputAsInput | InputAsTextarea;

const Input: NextComponent<InputProps> = ({
  error,
  isTouched,
  placeholder,
  type,
  as = 'input',
  id,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [iconRef, setIconRef] = useState<any>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const errorStyle = hasError && 'auth__input-wrapper--error';

  const inputStateStyle = hasError
    ? 'auth-error'
    : isTouched
    ? 'auth-success'
    : 'auth-neutral';

  useEffect(() => {
    setHasError(!!(isTouched && error));
  }, [isTouched, error]);

  return (
    <div className={`flex flex-col relative mb-6 ${errorStyle}`}>
      <div className="relative">
        {as === 'texarea' ? (
          <>
            {/* @ts-ignore */}
            <textarea
              {...rest}
              id={id}
              required
              placeholder={' '}
              className={`auth-input h-24 resize-none pt-4 w-full bg-white border border-gray-300 placeholder-opacity-0
        shadow-sm text-gray-900 text-sm placeholder-slate-600 px-4 focus:outline-none ${inputStateStyle}`}
            />
            <label
              ref={labelRef}
              className={`pointer-events-none select-none auth-label px-1  font-light text-gray-500 text-sm  absolute  left-4 top-4`}
              htmlFor={id}
            >
              {placeholder}
            </label>
          </>
        ) : (
          <>
            {/* @ts-ignore */}
            <input
              {...rest}
              id={id}
              type={type}
              required
              placeholder={' '}
              className={`auth-input h-12 w-full bg-white border border-gray-300 placeholder-opacity-0
        shadow-sm text-gray-900 text-sm placeholder-slate-600 px-4 focus:outline-none ${inputStateStyle}`}
            />
            <label
              ref={labelRef}
              className={`pointer-events-none select-none auth-label px-1 font-light text-gray-500 text-sm  absolute top-[30%] left-4 `}
              htmlFor={id}
            >
              {placeholder}
            </label>
          </>
        )}

        <div className="text-xl absolute right-2 top-1/2 -translate-y-1/2">
          {isTouched &&
            (hasError ? (
              <div ref={setIconRef} className="text-red-500">
                <IoAlertSharp />
              </div>
            ) : (
              <div className="text-primary">
                <GoCheck />
              </div>
            ))}
        </div>
      </div>

      {isTouched && !!error && (
        <span className="text-red-500 text-xs mt-1 ">{error}</span>
      )}

      {/* <Tooltip
        noArrow={true}
        offset={[0, 20]}
        className="auth__input-wrapper__tooltip"
        arrowClassName="auth__input-wrapper__tooltip--arrow"
        isOpen={isTouched && !!error}
        triggerEl={iconRef}
      >
        {error}
      </Tooltip> */}
    </div>
  );
};

export async function getStaticProps(context: any): Promise<any> {
  return {
    props: {
      inputID: uuidv4(),
    },
  };
}

export default Input;
