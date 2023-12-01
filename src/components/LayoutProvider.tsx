'use client';
import React from 'react';
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProps) {
  const pathname = usePathname();

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
                  <h1>Jobs</h1>
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
                      >
                        <i className={item.icon}></i>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <span>User name</span>
                  <span>Logout</span>
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
