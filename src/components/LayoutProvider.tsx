'use client';
import React from 'react';
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <html lang="en">
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
                <span>sidebar</span>
              </div>
              <div className="body">{children}</div>
            </div>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}
