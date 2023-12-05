'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import { Button, Col, Row, message } from 'antd';
import axios from 'axios';
import PageTitle from '@/components/PageTitle';
import Divider from '@/components/Divider';

export default function JobInfo() {
  const { jobid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [jobData, setJobData] = useState<any>(null);

  const fetchJob = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs/${jobid}`);
      setJobData(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const onApply = async () => {};

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />

        <Row gutter={[16, 16]}>
          <Col span={12} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Company</span>
              <span>{jobData.user.name}</span>
            </div>

            <div className="flex justify-between">
              <span>Location</span>
              <span>{jobData.location}</span>
            </div>

            <div className="flex justify-between">
              <span>Salary</span>
              <span>
                {jobData.salaryFromRange} LPA - {jobData.salaryToRange} LPA
              </span>
            </div>

            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{jobData.workMode}</span>
            </div>

            <div className="flex justify-between">
              <span>Job Type</span>
              <span>{jobData.jobType}</span>
            </div>

            <div className="flex justify-between">
              <span>Experience Required</span>
              <span>{jobData.experience} years</span>
            </div>
          </Col>

          <Col span={24}>
            <h1 className="text-md">Job Description</h1>
            <Divider />
            <span>{jobData.description}</span>

            <div className="flex justify-end gap-3">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="primary" onClick={onApply}>
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}
