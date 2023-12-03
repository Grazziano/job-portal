import React from 'react';

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="my-2">
      <h1 className="text-2xl font-semibold my-1">{title}</h1>
      <hr />
    </div>
  );
}
