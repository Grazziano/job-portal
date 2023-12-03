'use client';
import React from 'react';
import EmployeeForm from '@/components/EmployeeForm';
import EmployerForm from '@/components/EmployerForm';
import PageTitle from '@/components/PageTitle';
import { Button, Form, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '@/redux/loadersSlice';
import { SetCurrentUser } from '@/redux/usersSlice';
import axios from 'axios';

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      values._id = currentUser._id;
      values.userType = currentUser.userType;
      const { data } = await axios.put('/api/users', values);
      dispatch(SetCurrentUser(data.data));
      message.success('Profile updated successfully');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <PageTitle title="Profile" />

      <Form layout="vertical" initialValues={currentUser} onFinish={onFinish}>
        {currentUser?.userType === 'employer' ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}

        <div className="flex justify-end my-3">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
