import { useEffect, useState } from 'react';

interface IClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children, ...delegated }: IClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
