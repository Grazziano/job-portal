'use client';
import React from 'react';
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import { Form } from 'antd';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);

  const onFinish = () => {};

  return (
    <div>
      <Form>
        {currentUser?.userType === 'employer' ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}
      </Form>
    </div>
  );
}
