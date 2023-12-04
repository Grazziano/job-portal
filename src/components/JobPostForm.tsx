import React from 'react';
import { Col, Form, Row } from 'antd';

export default function JobPostForm() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item
          label="Title"
          rules={[{ required: true, message: 'Please enter a job title' }]}
          name="title"
        >
          <input type="text" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label="Description"
          rules={[
            { required: true, message: 'Please enter a job description' },
          ]}
          name="description"
        >
          <textarea />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Type"
          rules={[{ required: true, message: 'Please enter a job type' }]}
          name="jobType"
        >
          <select>
            <option value=""></option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Location"
          rules={[{ required: true, message: 'Please enter a location' }]}
          name="location"
        >
          <input type="text" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Experience"
          rules={[{ required: true, message: 'Please enter experience' }]}
          name="experience"
        >
          <input type="number" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Work Mode"
          rules={[{ required: true, message: 'Please enter work mode' }]}
          name="workMode"
        >
          <select>
            <option value=""></option>
            <option value="remote">Remote</option>
            <option value="office">Office</option>
          </select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Salary From Range"
          rules={[
            { required: true, message: 'Please enter salary from range' },
          ]}
          name="salaryFromRange"
        >
          <input type="number" />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          label="Salary To Range"
          rules={[{ required: true, message: 'Please enter salary to range' }]}
          name="salaryToRange"
        >
          <input type="number" />
        </Form.Item>
      </Col>
    </Row>
  );
}
