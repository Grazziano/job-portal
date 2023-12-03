import React from 'react';
import Divider from './Divider';

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="my-3">
      <h1 className="text-2xl font-semibold my-1">{title}</h1>
      <Divider />
    </div>
  );
}
