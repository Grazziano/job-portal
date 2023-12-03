'use client';
import React from 'react';
import { Button, Form, Radio, message } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';

interface LoginProps {
  userType: string;
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values: LoginProps) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post('/api/users/login', values);
      message.success(response.data.message);
      router.push('/');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-5 w-[450px]">
        <h1 className="text-3xl font-bold mb-2">Jobs - Login</h1>
        <hr className="mb-2" />

        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          {/* <Form.Item label="Login As" name="userType">
            <Radio.Group>
              <Radio value="employer">Employer</Radio>
              <Radio value="employee">Employee</Radio>
            </Radio.Group>
          </Form.Item> */}

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
