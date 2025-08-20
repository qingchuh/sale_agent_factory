import React, { useState } from 'react'
import { Layout, Dropdown, Avatar, Typography, Button } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Header: AntHeader } = Layout
const { Title, Text } = Typography

const Header: React.FC = () => {
  const navigate = useNavigate()
  const [user] = useState({
    name: 'Admin User',
    avatar: null,
    role: 'Administrator'
  })

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Account Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ]

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        navigate('/profile')
        break
      case 'settings':
        navigate('/settings')
        break
      case 'logout':
        // Handle logout
        console.log('Logout clicked')
        break
      default:
        break
    }
  }

  return (
    <AntHeader className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <GlobalOutlined className="text-white text-xl" />
          </div>
          <div>
            <Title level={4} className="mb-0 text-gray-900">AI Foreign Trade Business Development Platform</Title>
            <Text type="secondary" className="text-sm">Let AI automatically discover global business opportunities for you</Text>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button 
          type="text" 
          icon={<BellOutlined />} 
          className="text-gray-600 hover:text-blue-500"
        />
        
        {/* User Menu */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg">
            <Avatar 
              size="small" 
              icon={<UserOutlined />} 
              src={user.avatar}
              className="bg-blue-500"
            />
            <div className="text-left">
              <Text strong className="text-sm">{user.name}</Text>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  )
}

export default Header
