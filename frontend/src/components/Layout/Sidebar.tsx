import React from 'react'
import { Layout, Menu, Typography, Button } from 'antd'
import { 
  DashboardOutlined, 
  UserAddOutlined, 
  RocketOutlined, 
  TeamOutlined, 
  BarChartOutlined, 
  SettingOutlined 
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { Sider } = Layout
const { Title } = Typography

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/onboarding',
      icon: <UserAddOutlined />,
      label: 'Onboarding',
    },
    {
      key: '/business-development',
      icon: <RocketOutlined />,
      label: 'Business Development',
    },
    {
      key: '/leads',
      icon: <TeamOutlined />,
      label: 'Leads',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Sider width={250} className="bg-white border-r">
      <div className="p-6">
        <div className="text-center mb-8">
          <Title level={3} className="text-blue-600 mb-2">
            FactoryLink
          </Title>
          <p className="text-sm text-gray-500">AI Foreign Trade Business Development</p>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-0"
        />

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <Title level={5} className="text-blue-800 mb-2">
            🚀 Start Your AI Journey
          </Title>
          <p className="text-xs text-blue-600 mb-3">
            Let AI automatically discover global business opportunities for you
          </p>
          <Button type="primary" size="small" block>
            Get Started
          </Button>
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
