// src/app/components/Sidebar.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Button, Avatar, Divider, Tooltip, Modal, Badge } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  FileAddOutlined,
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { FaArrowRight } from 'react-icons/fa';

const { Sider } = Layout;

const Sidebar = ({ user, collapsed, setCollapsed }) => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const [openKeys, setOpenKeys] = useState(['user-management']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock notification counts (replace with real data)
  const [notificationCounts] = useState({
    addBlog: 2, // Example: Pending blog drafts
  });

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
      .then(() => (window.location.href = '/login'))
      .catch((error) => console.error('Logout failed:', error));
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 'user-management',
      icon: <UserOutlined />,
      label: 'User Management',
      children: [
        {
          key: 'users',
          label: <Link href="/dashboard/user-management">All Users</Link>,
        },
        {
          key: 'moderators',
          label: <Link href="/dashboard/mod-management">Moderators</Link>,
        },
      ],
    },
    {
      key: 'blog',
      icon: <FileOutlined />,
      label: 'Blog Management',
      children: [
        {
          key: 'add-blog',
          icon: (
            <Badge count={notificationCounts.addBlog} size="small" offset={[5, 0]}>
              <PlusOutlined />
            </Badge>
          ),
          label: <Link href="/dashboard/blog/add">Add Blog Post</Link>,
        },
        {
          key: 'edit-blog',
          icon: <EditOutlined />,
          label: <Link href="/dashboard/blog/edit">Edit Blog Posts</Link>,
        },
      ],
    },
    {
      key: 'services',
      icon: <AppstoreOutlined />,
      label: <Link href="/dashboard/services">Services</Link>,
    },
    {
      key: 'student',
      icon: <TeamOutlined />,
      label: <Link href="/dashboard/student-management">Student Management</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link href="/dashboard/settings">Settings</Link>,
    },
  ];

  return (
    <Sider
      width={256}
      collapsedWidth={80}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-gradient-to-b from-teal-900 to-teal-600"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="flex flex-col h-full font-inter">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div className="text-white font-bold text-xl tracking-tight animate-slide-up">
              Drishya Admin
            </div>
          )}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-teal-200 transition-colors duration-200"
            style={{ width: 64, height: 64 }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          />
        </div>

        {/* User Profile */}
        <div className="p-4">
          {collapsed ? (
            <div className="flex justify-center">
              <Tooltip title={user?.name} placement="right">
                <Avatar
                  size="default"
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  className="border-2 border-teal-300 transition-transform duration-300 hover:scale-110"
                />
              </Tooltip>
            </div>
          ) : (
            <div className="flex items-center bg-teal-800 bg-opacity-50 p-3 rounded-xl animate-slide-up">
              <Avatar
                size="large"
                src={user?.avatar}
                icon={<UserOutlined />}
                className="mr-3 border-2 border-teal-300 transition-transform duration-300 hover:scale-110"
              />
              <div>
                <div className="text-white font-semibold text-sm">{user?.name || 'Admin User'}</div>
                <div className="text-teal-200 text-xs">
                  {user?.role || 'Admin'}
                  {user?.role === 'Admin' && (
                    <span className="ml-2 inline-block bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <Divider className="bg-teal-500 opacity-50 m-0" />

        {/* Main Menu */}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={menuItems}
          className="bg-transparent text-teal-100"
          style={{
            borderRight: 0,
            flex: 1,
            overflow: 'auto',
          }}
          onClick={({ key }) => setSelectedKey(key)}
          theme="dark"
        >
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
                className="hover:bg-teal-700 hover:text-white transition-colors duration-200"
              >
                {item.children.map((child) => (
                  <Menu.Item
                    key={child.key}
                    icon={child.icon}
                    className="hover:bg-teal-600 hover:text-white"
                  >
                    {child.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                className="hover:bg-teal-700 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>

        {/* Logout */}
        <div className="p-4">
          <Tooltip title="Logout" placement="right" trigger={collapsed ? ['hover'] : []}>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              className="w-full text-teal-100 hover:text-white hover:bg-teal-700 rounded-lg transition-all duration-200 flex items-center"
              onClick={handleLogout}
            >
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
          </Tooltip>
        </div>

        {/* Logout Confirmation Modal */}
        <Modal
          title="Confirm Logout"
          open={isModalOpen}
          onOk={confirmLogout}
          onCancel={cancelLogout}
          okText="Logout"
          cancelText="Cancel"
          okButtonProps={{ className: 'bg-teal-600 hover:bg-teal-700' }}
          cancelButtonProps={{ className: 'border-teal-600 text-teal-600 hover:border-teal-700 hover:text-teal-700' }}
          centered
        >
          <p className="text-gray-700">Are you sure you want to log out?</p>
        </Modal>
      </div>
    </Sider>
  );
};

export default Sidebar;