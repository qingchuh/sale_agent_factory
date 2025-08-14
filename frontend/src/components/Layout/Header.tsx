import React from 'react'
import { Layout, Avatar, Badge, Dropdown, Space, Button } from 'antd'
import { BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header: AntHeader } = Layout

const Header: React.FC = () => {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <UserOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  return (
    <AntHeader className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-800">
          AI外贸业务开发平台
        </h2>
        <div className="text-sm text-gray-500">
          让AI为您自动发现全球商机
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Badge count={3} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="text-gray-600 hover:text-primary-600"
          />
        </Badge>
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Space className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Avatar
              size={32}
              icon={<UserOutlined />}
              className="bg-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              管理员
            </span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  )
}

export default Header
