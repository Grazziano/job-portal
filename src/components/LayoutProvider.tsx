import React from 'react';
import { ConfigProvider } from 'antd';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProps) {
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
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
