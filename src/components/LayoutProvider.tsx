'use client';
import React, { useEffect, useState } from 'react';
import { ConfigProvider, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '@/redux/usersSlice';
import { SetLoading } from '@/redux/loadersSlice';
import Loader from './Loader';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProps) {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { name: 'Home', path: '/', icon: 'ri-home-7-line' },
    { name: 'Profile', path: '/profile', icon: 'ri-shield-user-line' },
    {
      name: 'Applications',
      path: '/applications',
      icon: 'ri-file-list-2-line',
    },
    { name: 'Settings', path: '/settings', icon: 'ri-settings-2-line' },
    { name: 'Saved', path: '/saved', icon: 'ri-save-line' },
  ]);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get('/api/users/currentuser');
      const isEmployer = response.data.data.userType === 'employer';

      if (isEmployer) {
        const tempMenuItems = menuItems;
        tempMenuItems[2].name = 'Posted Jobs';
        tempMenuItems[2].path = '/jobs';
        setMenuItems(tempMenuItems);
      }

      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
      message.error('Please clear your cookies e try again');
      router.push('/login');
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== '/login' && pathname !== '/register' && !currentUser) {
      getCurrentUser();
    }
  }, [pathname]);

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post('/api/users/logout');
      message.success('Logged out successfully');
      dispatch(SetCurrentUser(null));
      router.push('/login');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.6.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#213555',
            },
          }}
        >
          {loading && <Loader />}

          {/* if route is login or register, dont show layout */}
          {pathname === '/login' || pathname === '/register' ? (
            <div>{children}</div>
          ) : (
            currentUser && (
              <div className="layout-parent">
                <div className="sidebar">
                  <div className="logo">
                    {isSideBarExpanded && <h1>Jobs</h1>}
                    {!isSideBarExpanded && (
                      <i
                        className="ri-menu-line"
                        onClick={() => setIsSideBarExpanded(!isSideBarExpanded)}
                      ></i>
                    )}
                    {isSideBarExpanded && (
                      <i
                        className="ri-close-line"
                        onClick={() => setIsSideBarExpanded(!isSideBarExpanded)}
                      ></i>
                    )}
                  </div>

                  <div className="menu-items">
                    {menuItems.map((item, index) => {
                      const isActive = pathname === item.path;

                      return (
                        <div
                          className={`menu-item ${
                            isActive ? 'active-menu-item' : ''
                          }`}
                          key={index}
                          style={{
                            justifyContent: isSideBarExpanded
                              ? 'flex-start'
                              : 'center',
                          }}
                          onClick={() => router.push(item.path)}
                        >
                          <i className={item.icon}></i>
                          {isSideBarExpanded && <span>{item.name}</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="user-info">
                    {isSideBarExpanded && (
                      <div className="flex flex-col">
                        <span>{currentUser?.name}</span>
                        <span>{currentUser?.email}</span>
                      </div>
                    )}

                    <i className="ri-logout-box-r-line" onClick={onLogout}></i>
                  </div>
                </div>
                <div className="body">{children}</div>
              </div>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}
