// src/app/components/DashboardLayout.js
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, ConfigProvider, Spin, Result, Button, notification } from 'antd';
import {  LockOutlined, WarningOutlined, LoginOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import Header from './Header';
import AuthGuard from '../contexts/AuthGuard.js';
import SessionLoader from './SessionLoader';

const { Content } = Layout;

const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
  NETWORK_ERROR: 'NETWORK_ERROR',
};

const TOKEN_REFRESH_THRESHOLD = 300000; // 5 minutes before expiry

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [authState, setAuthState] = useState({
    loading: true,
    error: null,
    user: null,
  });
  const router = useRouter();

  // Clear auth data and force logout
  const clearAuthData = useCallback(() => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setAuthState({ loading: false, error: ERROR_CODES.UNAUTHORIZED, user: null });
  }, []);

  // Verify session and handle token refresh
  const verifySession = useCallback(async () => {
    try {
      const response = await fetch('/api/users/me', {
        credentials: 'include',
        headers: { 'Cache-Control': 'no-cache' },
      });

      if (response.status === 401) {
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshResponse.ok) throw new Error(ERROR_CODES.UNAUTHORIZED);

        const retryResponse = await fetch('/api/users/me', { credentials: 'include' });
        if (!retryResponse.ok) throw new Error(ERROR_CODES.UNAUTHORIZED);

        const { data } = await retryResponse.json();
        return setAuthState({ loading: false, error: null, user: data.user });
      }

      if (response.ok) {
        const { data } = await response.json();

        if (data.expiresAt) {
          const expiresIn = new Date(data.expiresAt).getTime() - Date.now();
          const refreshTime = Math.max(0, expiresIn - TOKEN_REFRESH_THRESHOLD);
          setTimeout(() => {
            fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' }).catch(console.error);
          }, refreshTime);
        }

        setAuthState({ loading: false, error: null, user: data.user });
      } else {
        throw new Error(
          response.status === 403 ? ERROR_CODES.FORBIDDEN :
          response.status === 503 ? ERROR_CODES.MAINTENANCE_MODE :
          ERROR_CODES.NETWORK_ERROR
        );
      }
    } catch (error) {
      console.error('Session error:', error);
      clearAuthData();
      if (!window.location.pathname.startsWith('/login')) {
        notification.error({
          message: 'Session Error',
          description: error.message,
          placement: 'topRight',
          style: { backgroundColor: '#f0fdfa', color: '#0f766e' },
        });
        router.push(`/login?error=${encodeURIComponent(error.message)}`);
      }
    }
  }, [router, clearAuthData]);

  // Initialize session check
  useEffect(() => {
    verifySession();
  }, [verifySession]);

  // Loading state
if (authState.loading) {
  return <SessionLoader />;
}

  // Error state
  if (authState.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-teal-50 p-4">
        <Result
          status={
            authState.error === ERROR_CODES.FORBIDDEN ? '403' :
            authState.error === ERROR_CODES.MAINTENANCE_MODE ? 'warning' :
            'error'
          }
          icon={
            authState.error === ERROR_CODES.FORBIDDEN ? (
              <LockOutlined className="text-teal-600 text-5xl" />
            ) : authState.error === ERROR_CODES.MAINTENANCE_MODE ? (
              <WarningOutlined className="text-yellow-500 text-5xl" />
            ) : (
              <WarningOutlined className="text-red-500 text-5xl" />
            )
          }
          title={
            authState.error === ERROR_CODES.FORBIDDEN ? (
              <span className="text-teal-900 text-2xl font-semibold">Access Denied</span>
            ) : authState.error === ERROR_CODES.MAINTENANCE_MODE ? (
              <span className="text-teal-900 text-2xl font-semibold">Maintenance Mode</span>
            ) : (
              <span className="text-teal-900 text-2xl font-semibold">Session Error</span>
            )
          }
          subTitle={
            authState.error === ERROR_CODES.FORBIDDEN ? (
              <span className="text-teal-700">You don&apos;t have permission to access this dashboard.</span>
            ) : authState.error === ERROR_CODES.MAINTENANCE_MODE ? (
              <span className="text-teal-700">System is under maintenance. Please try again later.</span>
            ) : (
              <span className="text-teal-700">Your session has expired. Please login again.</span>
            )
          }
          extra={
            <Button
              type="primary"
              icon={<LoginOutlined />}
              className="bg-teal-600 hover:bg-teal-700 border-none text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
              onClick={() => {
                clearAuthData();
                router.push('/login');
              }}
            >
              Return to Login
            </Button>
          }
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full animate-slide-up"
        />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#ffffff',
            headerPadding: '0 24px',
            headerHeight: 64,
          },
          Button: {
            primaryColor: '#0f766e',
            primaryHoverColor: '#115e59',
          },
        },
      }}
    >
      <AuthGuard
        allowedRoles={['admin', 'moderator']}
        userRole={authState.user?.role}
        onUnauthorized={() => {
          clearAuthData();
          router.push('/');
        }}
      >
        <Layout className="min-h-screen font-inter">
          <Sidebar
            user={authState.user}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          <Layout
            className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} bg-teal-50`}
          >
            <Header user={authState.user} />
            <Content className="m-4 overflow-auto">
              <div
                className="p-4 md:p-6 h-full bg-white rounded-2xl shadow-lg border-t-4 border-teal-600 animate-slide-up"
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </AuthGuard>
    </ConfigProvider>
  );
};

export default DashboardLayout;