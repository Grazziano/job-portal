'use client';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { Button, Modal, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import moment from 'moment';

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
  const [applications, setApplications] = useState([]);
  const dispatch = useDispatch();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?job=${selectedJob._id}`
      );
      setApplications(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.put(`/api/applications/${applicationId}`, {
        status,
      });
      message.success(response.data.message);
      fetchApplications();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    {
      title: 'Application ID',
      dataIndex: '_id',
    },
    {
      title: 'Applicant',
      dataIndex: 'user',
      render: (user: any) => user.name,
    },
    {
      title: 'Email',
      dataIndex: 'user',
      render: (user: any) => user.email,
    },
    {
      title: 'Apply On',
      dataIndex: 'created_at',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string, record: any) => (
        <select
          value={status}
          onChange={(e) => onStatusUpdate(record._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },
  ];

  return (
    <Modal
      title={`Applications for ${selectedJob.title}`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      width={1000}
    >
      <div className="my-3">
        <Table columns={columns} dataSource={applications} />
      </div>
    </Modal>
  );
}
