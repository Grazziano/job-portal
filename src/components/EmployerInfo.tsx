import { Col, Row } from 'antd';
import React from 'react';
import Divider from './Divider';

interface EmployerInfoProps {
  employerInfo: {
    about: string;
    address: string;
    companySize: string;
    createdAt: string;
    email: string;
    establishmentYear: string;
    isAdmin: boolean;
    name: string;
    phone: string;
    updatedAt: string;
    userType: string;
    website: string;
    _id: string;
  };
}

export default function EmployerInfo({ employerInfo }: EmployerInfoProps) {
  return (
    <Row>
      <Col span={12}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Company Name</span>
            <span>{employerInfo.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Establishment Year</span>
            <span>{employerInfo.establishmentYear}</span>
          </div>

          <div className="flex justify-between">
            <span>Company Size</span>
            <span>{employerInfo.companySize}</span>
          </div>

          <div className="flex justify-between">
            <span>Email</span>
            <span>{employerInfo.email}</span>
          </div>

          <div className="flex justify-between">
            <span>Phone</span>
            <span>{employerInfo.phone}</span>
          </div>

          <div className="flex justify-between">
            <span>Website</span>
            <span>{employerInfo.website}</span>
          </div>

          <div className="flex justify-between">
            <span>Address</span>
            <span>{employerInfo.address}</span>
          </div>
        </div>
      </Col>

      <Col span={24} className="my-3">
        <Divider />
        <h1 className="text-md">
          <b>About</b>
        </h1>
        <span>{employerInfo.about}</span>
      </Col>
    </Row>
  );
}
