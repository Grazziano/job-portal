'use client';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { Button, Table, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import axios from 'axios';
import moment from 'moment';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchApplications = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(
        `/api/applications?user=${currentUser._id}`
      );
      setApplications(response.data.data);
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
      title: 'Job Title',
      dataIndex: 'job',
      render: (job: any) => job.title,
    },
    {
      title: 'Company',
      dataIndex: 'job',
      render: (job: any) => job.user.name,
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Apply On',
      dataIndex: 'created_at',
      render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
      </div>

      <div className="my-3">
        <Table columns={columns} dataSource={applications} />
      </div>
    </div>
  );
}
