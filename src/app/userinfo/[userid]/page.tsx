'use client';
import React, { useEffect, useState } from 'react';
import { SetLoading } from '@/redux/loadersSlice';
import { message } from 'antd';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import PageTitle from '@/components/PageTitle';
import EmployerInfo from '@/components/EmployerInfo';
import EmployeeInfo from '@/components/EmployeeInfo';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const dispatch = useDispatch();
  const { userid } = useParams();

  const fetchUserInfo = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/users/${userid}`);
      setUserInfo(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo.userType === 'employer' ? 'Employer' : 'Employee'
          } Info`}
        />

        {userInfo.userType === 'employer' ? <EmployerInfo /> : <EmployeeInfo />}
      </div>
    )
  );
}
