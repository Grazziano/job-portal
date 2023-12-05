'use client';
import React from 'react';
import { Modal } from 'antd';

interface ApplicationsProps {
  showApplications: boolean;
  setShowApplications: (showApplications: boolean) => void;
  selectedJob: any;
}

export default function Applications({
  showApplications,
  setShowApplications,
  selectedJob,
}: ApplicationsProps) {
  return (
    <Modal
      title="Applications"
      open={showApplications}
      onCancel={() => setShowApplications(false)}
    ></Modal>
  );
}
