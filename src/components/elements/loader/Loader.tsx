import anime from 'animejs';
import React, { useEffect, useRef } from 'react';

const OUTER_DURATION = 1000;
const INNER_DURATION = 600;
// const DELAY = 600;
const EASING = 'easeInOutQuad';
// const EASING = 'easeInOutSine';
// const EASING = 'linear';

interface LoaderProps {
  className?: string;
  outerSideClassName?: string;
  innerSideClassName?: string;
  // size?: 'custom' | 'small' | 'medium' | 'big';
  appearance?: 'primary' | 'secondary';
  strokeWidth?: number;
  // duration?: number;
  // delay?: number;
  // easing?: string;
}

const Loader = ({
  className,
  outerSideClassName,
  innerSideClassName,
  strokeWidth = 5,
  appearance = 'secondary',
}: LoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<SVGPathElement>(null);
  const innerRef = useRef<SVGPathElement>(null);

  const handleClasses = () => {
    let outerClass = '';
    let innerClass = '';
    const addOuterClasses = (classes: string) => (outerClass += ' ' + classes);
    const addInnerClasses = (classes: string) => (innerClass += ' ' + classes);

    switch (appearance) {
      case 'primary':
        addOuterClasses(`stroke-primary`);
        addInnerClasses(`fill-primary`);
        break;
      case 'secondary':
        addOuterClasses(`stroke-white`);
        addInnerClasses(`fill-white`);
        break;
      default:
    }

    return { outer: outerClass, inner: innerClass };
  };

  useEffect(() => {
    containerRef.current?.classList.remove('hidden');
    anime
      .timeline({
        easing: EASING,
        loop: true,
      })
      .add({
        duration: OUTER_DURATION,
        targets: outsideRef.current,
        strokeDashoffset: [
          anime.setDashoffset,
          -anime.setDashoffset(outsideRef.current),
        ],
      });
  }, []);

  return (
    <div ref={containerRef} className="fixedS left-3/ left-1/4 top-1/4 hidden">
      {/* prettier-ignore */}
      <svg className={className} viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* <path className={outerSideClassName} ref={outsideRef} d="M2.59808 67.5L39.8372 3L77.0763 67.5H2.59808Z" strokeWidth="5"/>
        <path className={innerSideClassName} ref={innerRef} d="M19.5928 58.5L40 23.0092L60.4072 58.5H19.5928Z"  strokeWidth="5"/> */}
        <path className={handleClasses().outer} ref={outsideRef} d="M2.59808 67.5L39.8372 3L77.0763 67.5H2.59808Z" strokeWidth={strokeWidth}/>
        <path className={handleClasses().inner} ref={innerRef} d="M19.5928 58.5L40 23.0092L60.4072 58.5H19.5928Z"  strokeWidth={strokeWidth}/>
      </svg>
    </div>
  );
};

export default Loader;
