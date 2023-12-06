'use client';
import React, { useEffect, useState } from 'react';
import { SetLoading } from '@/redux/loadersSlice';
import { Col, Row, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Divider from '@/components/Divider';
import { useRouter } from 'next/navigation';
import Filters from '@/components/Filters';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    searchText: '',
    location: '',
  });

  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs`, { params: filters });
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />
      <Row gutter={[16, 16]} className="gap-3">
        {jobs.map((job: any) => (
          <Col
            span={8}
            className="card flex flex-col gap-2 py-3 cursor-pointer"
            key={job._id}
            onClick={() => router.push(`/jobinfo/${job._id}`)}
          >
            <h1 className="text-md">
              <b>{job.title}</b>
            </h1>
            <Divider />

            <div className="flex justify-between">
              <span>Company</span>
              <span>{job.user.name}</span>
            </div>

            <div className="flex justify-between">
              <span>Location</span>
              <span>{job.location}</span>
            </div>

            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {job.salaryFromRange} LPA - {job.salaryToRange} LPA
              </span>
            </div>

            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{job.workMode}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
