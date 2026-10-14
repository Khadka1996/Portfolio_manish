// src/app/components/Header.js
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FaSearch, FaBell, FaUserCircle, FaTimes, FaChevronRight, FaTrash } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, Badge, Avatar, Modal, Button } from 'antd';

const Header = ({ user }) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    for (let i = 1; i < paths.length; i++) {
      const path = paths[i];
      const href = `/${paths.slice(0, i + 1).join('/')}`;
      const name = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({
        title: i === paths.length - 1 ? (
          <span className="text-teal-600 font-medium">{name}</span>
        ) : (
          <a href={href} className="text-gray-600 hover:text-teal-500 transition-colors duration-200">
            {name}
          </a>
        ),
      });
    }
    return breadcrumbs;
  };

  // Fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsResponse = await fetch('/api/users/admin/audit-logs');
        const logsData = await logsResponse.json();
        setNotifications(logsData.logs || []);
        setUnreadCount(logsData.unread || 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search logic
  };

  const markNotificationsAsRead = async () => {
    try {
      await fetch('/api/users/admin/audit-logs/mark-read', { method: 'POST' });
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      await fetch('/api/users/admin/audit-logs/clear', { method: 'POST' });
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const toggleNotifications = () => {
    if (!showNotifications && unreadCount > 0) {
      markNotificationsAsRead();
    }
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
      .then(() => (window.location.href = '/login'))
      .catch((error) => console.error('Logout failed:', error));
    setIsLogoutModalOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <a href="/dashboard/profile" className="flex items-center gap-2 text-teal-700">
          <FaUserCircle />
          My Profile
        </a>
      ),
    },
    {
      key: 'settings',
      label: (
        <a href="/dashboard/settings" className="flex items-center gap-2 text-teal-700">
          <SettingOutlined />
          Settings
        </a>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 w-full"
        >
          <LogoutOutlined />
          Logout
        </button>
      ),
    },
  ];

  return (
    <header className="bg-white shadow-sm p-4 flex flex-col sticky top-0 z-50 font-inter">
      {/* Top Row */}
      <div className="flex items-center justify-between w-full">
        {/* Breadcrumbs (Desktop) */}
        <div className="hidden md:block">
          <Breadcrumb
            separator={<FaChevronRight className="text-teal-400 text-xs" />}
            items={[
              {
                title: (
                  <a
                    href="/dashboard"
                    className="text-gray-600 hover:text-teal-500 transition-colors duration-200"
                  >
                    Dashboard
                  </a>
                ),
              },
              ...getBreadcrumbs(),
            ]}
            className="text-sm animate-slide-up"
          />
        </div>

        {/* Mobile Title */}
        <h1 className="text-lg font-semibold text-teal-900 md:hidden animate-slide-up">
          {getBreadcrumbs().slice(-1)[0]?.title || 'Dashboard'}
        </h1>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-teal-50 px-4 py-2 rounded-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-teal-500 focus-within:bg-white"
          >
            <input
              type="text"
              className="bg-transparent outline-none text-teal-900 w-40 lg:w-64 text-sm placeholder-teal-400"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="text-teal-500 hover:text-teal-700 transition-colors"
              aria-label="Search"
            >
              <FaSearch size={16} />
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-teal-500 hover:text-teal-700 transition-colors ml-2"
                aria-label="Clear search"
              >
                <FaTimes size={14} />
              </button>
            )}
          </form>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 hover:bg-teal-100 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Badge count={unreadCount} size="small" className="text-teal-600">
                <MdNotifications
                  size={20}
                  className={unreadCount > 0 ? 'text-teal-600' : 'text-gray-500'}
                />
              </Badge>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-teal-100 z-50 animate-slide-up">
                <div className="p-3 border-b border-teal-200 flex justify-between items-center">
                  <h3 className="font-semibold text-teal-900">Notifications</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearNotifications}
                      className="text-teal-500 hover:text-teal-700 text-sm"
                      aria-label="Clear all notifications"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={toggleNotifications}
                      className="p-1 hover:bg-teal-100 rounded-full"
                      aria-label="Close notifications"
                    >
                      <FaTimes size={14} className="text-teal-500" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-teal-100">
                  {loading ? (
                    <div className="p-4 text-center text-teal-500 text-sm">Loading...</div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-teal-500 text-sm">No notifications</div>
                  ) : (
                    notifications.map((log) => (
                      <div
                        key={log._id}
                        className="p-3 border-b border-teal-50 hover:bg-teal-50 transition-colors duration-200"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 text-teal-600">
                            <FaBell size={14} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-teal-900 text-sm">{log.action}</p>
                            <p className="text-xs text-gray-600">{log.description}</p>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-teal-500">{log.user}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-teal-200 text-center bg-teal-50">
                  <a
                    href="/dashboard/audit-logs"
                    className="text-sm text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    View All Notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-teal-100 rounded-full p-1 transition-colors duration-200">
              <Avatar
                size="default"
                src={user?.avatar}
                icon={<FaUserCircle />}
                className="border-2 border-teal-300 transition-transform duration-300 hover:scale-110"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-teal-900">{user?.name || 'Admin User'}</div>
                <div className="text-xs text-teal-600 capitalize">
                  {user?.role || 'Admin'}
                  {user?.role === 'Admin' && (
                    <span className="ml-1 inline-block bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-2">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-teal-50 px-4 py-2 rounded-lg w-full transition-all duration-300 focus-within:ring-2 focus-within:ring-teal-500"
        >
          <input
            type="text"
            className="bg-transparent outline-none text-teal-900 flex-grow text-sm placeholder-teal-400"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="text-teal-500 hover:text-teal-700 transition-colors ml-2"
            aria-label="Search"
          >
            <FaSearch size={16} />
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-teal-500 hover:text-teal-700 transition-colors ml-2"
              aria-label="Clear search"
            >
              <FaTimes size={14} />
            </button>
          )}
        </form>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onOk={confirmLogout}
        onCancel={cancelLogout}
        okText="Logout"
        cancelText="Cancel"
        okButtonProps={{ className: 'bg-teal-600 hover:bg-teal-700' }}
        cancelButtonProps={{ className: 'border-teal-600 text-teal-600 hover:border-teal-700 hover:text-teal-700' }}
        centered
      >
        <p className="text-teal-900">Are you sure you want to log out?</p>
      </Modal>
    </header>
  );
};

export default Header;