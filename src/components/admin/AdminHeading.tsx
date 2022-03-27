import React from 'react';

interface IAdminHeadingProps {
  children: React.ReactNode;
}

const AdminHeading = ({ children }: IAdminHeadingProps) => {
  return <h1 className="py-4 mb-4 text-3xl">{children}</h1>;
};

export default AdminHeading;
