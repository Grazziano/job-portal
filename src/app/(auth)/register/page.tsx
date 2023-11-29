'use client';
import React from 'react';
import { Button, Form, Radio } from 'antd';
import Link from 'next/link';

interface RegisterProps {
  userType: string;
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const onFinish = (values: RegisterProps) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-[450px]">
        <h1 className="text-3xl font-bold mb-2">Jobs - Register</h1>
        <hr className="mb-2" />

        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label="Register As" name="userType">
            <Radio.Group>
              <Radio value="employer">Employer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Name" name="name">
            <input type="text" className="input" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>

          <Link href="/login">Already have an account? Login</Link>
        </Form>
      </div>
    </div>
  );
}
