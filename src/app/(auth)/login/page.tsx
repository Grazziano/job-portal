'use client';
import React from 'react';
import { Button, Form } from 'antd';
import Link from 'next/link';

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const onFinish = (values: LoginProps) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-[450px]">
        <h1 className="text-xl">Jobs - Login</h1>
        <hr />

        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item label="Email" name="email">
            <input type="email" className="input" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <input type="password" className="input" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>

          <Link href="/register">Don{`'`}t have an account? Register</Link>
        </Form>
      </div>
    </div>
  );
}
