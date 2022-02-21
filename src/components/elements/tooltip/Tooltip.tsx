import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { StrictModifier, usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
// import './tooltip.scss';

export interface ITooltipProps {
  children?: React.ReactNode;
  className?: string;
  arrowClassName?: string;
  triggerEl: HTMLElement | null;
  placement?: VariationPlacement;
  isOpen?: boolean;
  offset?: [number, number];
  noArrow?: boolean;
  forceVisible?: boolean;
}

const Tooltip = ({
  triggerEl,
  placement,
  offset,
  noArrow,
  children,
  className,
  arrowClassName,
  forceVisible,
  isOpen,
}: ITooltipProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  // const isBrowser = typeof window !== undefined;
  //   const [isBrowser, setIsBrowser] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
    // if (typeof window === 'object') {
    //   window.addEventListener('load', () => {
    //     setIsBrowser(true);
    //   });
    // } else {
    //   setIsBrowser(false);
    // }
    // setIsBrowser(typeof window === 'object');
    // console.log(isBrowser);
  }, []);

  const customModifier: StrictModifier[] = useMemo(
    () => [
      {
        name: 'arrow',
        options: {
          element: '[data-popper-arrow]',
        },
      },
      {
        name: 'offset',
        options: { offset: offset || [0, 12] },
      },
    ],
    []
  );

  const { styles, attributes } = usePopper(triggerEl, popperElement, {
    modifiers: customModifier,
    placement: placement || 'right',
    strategy: 'fixed',
  });

  useEffect(() => {
    if (isOpen === undefined) return;
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!triggerEl) return;

    const handleVisible = async () => {
      setIsVisible(true);
    };

    const handleInvisible = async () => {
      setIsVisible(false);
    };

    triggerEl.addEventListener('mouseenter', handleVisible);
    triggerEl.addEventListener('mouseleave', handleInvisible);
    triggerEl.addEventListener('focusin', handleVisible);
    triggerEl.addEventListener('focusout', handleInvisible);

    return () => {
      triggerEl.removeEventListener('mouseenter', handleVisible);
      triggerEl.removeEventListener('mouseleave', handleInvisible);
      triggerEl.removeEventListener('focusin', handleVisible);
      triggerEl.removeEventListener('focusout', handleInvisible);
    };
  }, [triggerEl]);

  const duration = 200;

  return (
    <>
      {isMounted
        ? ReactDOM.createPortal(
            <CSSTransition
              nodeRef={nodeRef}
              unmountOnExit
              in={forceVisible || isVisible}
              timeout={duration}
              classNames="tooltip"
            >
              <div style={{ position: 'absolute' }} ref={nodeRef}>
                <div
                  ref={setPopperElement}
                  className={`${
                    className || 'tooltip-container--preset'
                  } tooltip-container`}
                  style={{ ...styles.popper }}
                  {...attributes.popper}
                >
                  {children}

                  {/* {!noArrow && ( */}
                  <div
                    className={`tooltip-arrow ${
                      arrowClassName ? arrowClassName : ''
                    }`}
                    data-popper-arrow=""
                    style={styles.arrow}
                  />
                  {/* // )} */}
                </div>
              </div>
            </CSSTransition>,
            document.querySelector('#__next')!
          )
        : null}
    </>
  );
};

export default Tooltip;

type VariationPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'auto'
  | 'auto-start'
  | 'auto-end';
