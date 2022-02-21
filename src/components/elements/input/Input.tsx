import React, { useEffect, useRef, useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { IoAlertSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

// ? La logique des inputs se trouve dans le fichier scss (components/auth/input.scss)

interface IProps extends React.HTMLProps<HTMLInputElement> {
  error?: string | undefined;
  isTouched?: boolean;
}

const Input = ({ error, isTouched, placeholder, ...rest }: IProps) => {
  const [hasError, setHasError] = useState(false);
  const [iconRef, setIconRef] = useState<any>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [inputID, setInputID] = useState<string>('');
  const [isMount, setIsMount] = useState(false);

  const errorStyle = hasError && 'auth__input-wrapper--error';

  useEffect(() => {
    setIsMount(true);
    setInputID(uuidv4());
    return () => {
      setIsMount(false);
    };
  }, []);

  const inputStateStyle = hasError
    ? 'auth-error'
    : isTouched
    ? 'auth-success'
    : 'auth-neutral';

  useEffect(() => {
    setHasError(!!(isTouched && error));
  }, [isTouched, error]);

  if (!isMount) return null;

  return (
    <div className={`flex flex-col relative mb-6 ${errorStyle}`}>
      <div className="relative">
        <input
          id={inputID}
          required
          placeholder={' '}
          className={`auth-input h-12 w-full bg-white border border-gray-300 placeholder-opacity-0
        shadow-sm text-gray-900 text-sm placeholder-slate-600 px-4 focus:outline-none ${inputStateStyle}`}
          {...rest}
        />

        <label
          ref={labelRef}
          className={`pointer-events-none select-none auth-label px-1 font-light text-gray-500 text-sm  absolute top-[30%] left-4 `}
          htmlFor={inputID}
        >
          {placeholder}
        </label>

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
    // <div className={`flex relative mb-6 ${errorStyle}`}>
    //   <input
    //     className="h-12 w-full bg-white shadow-sm text-gray-900 text-sm placeholder-slate-600 px-4"
    //     {...rest}
    //   />

    //   <div className="text-xl absolute right-2 top-1/2 -translate-y-1/2">
    //     {isTouched &&
    //       (hasError ? (
    //         <div ref={setIconRef} className="text-red-500">
    //           <RiErrorWarningLine />
    //         </div>
    //       ) : (
    //         <div className="text-blue-600">
    //           <CgCheckO />
    //         </div>
    //       ))}
    //   </div>

    //   <Tooltip
    //     noArrow={true}
    //     offset={[0, 20]}
    //     className="auth__input-wrapper__tooltip"
    //     arrowClassName="auth__input-wrapper__tooltip--arrow"
    //     isOpen={isTouched && !!error}
    //     triggerEl={iconRef}
    //   >
    //     {error}
    //   </Tooltip>
    // </div>
  );
};

export default Input;
