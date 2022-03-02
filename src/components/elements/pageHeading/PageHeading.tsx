import React from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="px-4 h h-14 flex items-center justify-between border-b">
      <h2 className="capitalize text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default PageTitle;
