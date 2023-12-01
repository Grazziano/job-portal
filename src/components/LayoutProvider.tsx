'use client';
import React, { useEffect, useState } from 'react';
import { ConfigProvider, message } from 'antd';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '@/redux/usersSlice';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProps) {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.users);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get('/api/users/currentuser');
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [pathname]);

  const menuItems = [
    { name: 'Home', path: '/', icon: 'ri-home-7-line' },
    { name: 'Profile', path: '/profile', icon: 'ri-shield-user-line' },
    {
      name: 'Applications',
      path: '/applications',
      icon: 'ri-file-list-2-line',
    },
    { name: 'Settings', path: '/settings', icon: 'ri-settings-2-line' },
    { name: 'Saved', path: '/saved', icon: 'ri-save-line' },
  ];

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
          {/* if route is login or register, dont show layout */}
          {pathname === '/login' || pathname === '/register' ? (
            <div>{children}</div>
          ) : (
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

                  <i className="ri-logout-box-r-line"></i>
                </div>
              </div>
              <div className="body">{children}</div>
            </div>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}
