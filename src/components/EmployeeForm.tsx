import React from 'react';
import { Col, Form, Row } from 'antd';

export default function EmployeeForm() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Required' }]}
          >
            <input type="email" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Phone"
            name="phone"
            // rules={[{ required: true, message: 'Required' }]}
          >
            <input type="text" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Carrier Objective"
            name="carrierObjective"
            // rules={[{ required: true, message: 'Required' }]}
          >
            <textarea />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
