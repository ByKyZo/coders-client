import React from 'react';
interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;
