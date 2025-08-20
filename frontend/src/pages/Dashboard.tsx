import React from 'react'
import { Card, Row, Col, Statistic, Typography, List, Avatar, Tag, Progress } from 'antd'
import { UserOutlined, CheckCircleOutlined, RiseOutlined, GlobalOutlined, BellOutlined } from '@ant-design/icons'
import AIChatWidget from '../components/AIChatWidget'

const { Title, Text } = Typography

const Dashboard: React.FC = () => {
  const recentActivities = [
    {
      title: 'New Lead Generated',
      description: 'AI discovered a consumer electronics brand from North America',
      time: '2 minutes ago',
      type: 'lead'
    },
    {
      title: 'Outreach Emails Sent',
      description: 'Personalized emails sent to 5 high-value prospects',
      time: '15 minutes ago',
      type: 'email'
    },
    {
      title: 'Factory Profile Updated',
      description: 'Product line information synchronized to latest version',
      time: '1 hour ago',
      type: 'profile'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <Title level={2}>Dashboard</Title>
        <Text className="text-lg text-gray-600">
          Welcome back! Here's your business development overview
        </Text>
      </div>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Prospects"
              value={156}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix="prospects"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Qualified Leads"
              value={89}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="leads"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={23.5}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Markets"
              value={8}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              suffix="markets"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Recent Activities */}
        <Col xs={24} lg={16}>
          <Card title="Recent Activities" className="mb-6">
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={<BellOutlined />}
                        className="bg-blue-500"
                      />
                    }
                    title={item.title}
                    description={
                      <div>
                        <div className="text-gray-600">{item.description}</div>
                        <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                      </div>
                    }
                  />
                  <Tag color="blue">{item.type}</Tag>
                </List.Item>
              )}
            />
          </Card>

          {/* Business Development Progress */}
          <Card title="Business Development Progress">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Lead Generation</Text>
                  <Text>75%</Text>
                </div>
                <Progress percent={75} strokeColor="#1890ff" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Customer Qualification</Text>
                  <Text>60%</Text>
                </div>
                <Progress percent={60} strokeColor="#52c41a" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Text>Outreach Campaigns</Text>
                  <Text>45%</Text>
                </div>
                <Progress percent={45} strokeColor="#722ed1" />
              </div>
            </div>
          </Card>
        </Col>

        {/* AI Chat Widget */}
        <Col xs={24} lg={8}>
          <AIChatWidget 
            title="AI Business Assistant"
            placeholder="Ask me about your business development..."
          />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
