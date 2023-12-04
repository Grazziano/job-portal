'use client';
import React from 'react';
import PageTitle from '@/components/PageTitle';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function NewJob() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Job" />
        <Button type="primary" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
