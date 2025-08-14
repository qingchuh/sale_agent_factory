import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  RocketOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表板',
    },
    {
      key: '/onboarding',
      icon: <RocketOutlined />,
      label: '引导配置',
    },
    {
      key: '/business-development',
      icon: <GlobalOutlined />,
      label: '业务开发',
    },
    {
      key: '/leads',
      icon: <UserOutlined />,
      label: '潜在客户',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: '数据分析',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ]

  return (
    <Sider
      width={256}
      className="fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200"
      style={{ zIndex: 1000 }}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <RocketOutlined className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">AIBD-FactoryLink</h1>
            <p className="text-sm text-gray-500">AI外贸业务开发</p>
          </div>
        </div>
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        className="border-0"
        items={menuItems}
      />
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <div className="text-primary-800 text-sm font-medium mb-2">
            🚀 开始您的AI之旅
          </div>
          <p className="text-primary-600 text-xs">
            让AI为您自动发现全球商机
          </p>
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
