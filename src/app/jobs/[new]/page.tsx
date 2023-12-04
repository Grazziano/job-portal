'use client';
import React from 'react';
import PageTitle from '@/components/PageTitle';
import { Button, Form } from 'antd';
import { useRouter } from 'next/navigation';
import JobPostForm from '@/components/JobPostForm';

export default function NewJob() {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Job" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form layout="vertical">
        <JobPostForm />

        <div className="flex justify-end items-center gap-3 my-3">
          <Button type="default" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Post Job
          </Button>
        </div>
      </Form>
    </div>
  );
}
