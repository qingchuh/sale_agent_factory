import React from 'react'
import { Card, Statistic, Row, Col, Typography } from 'antd'
import { UserOutlined, RiseOutlined, GlobalOutlined, TrophyOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Analytics: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Title level={1}>Data Analytics</Title>
      <Paragraph className="text-lg text-gray-600 mb-8">
        AI-powered business intelligence and performance insights
      </Paragraph>

      {/* Key Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Prospects"
              value={156}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
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
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Markets"
              value={8}
              prefix={<GlobalOutlined />}
              suffix="markets"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Success Cases"
              value={37}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Area */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card title="Customer Source Distribution">
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart components will be displayed here
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Market Performance Trends">
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart components will be displayed here
            </div>
          </Card>
        </Col>
      </Row>

      {/* Detailed Analysis */}
      <Card title="Detailed Analysis Report" className="mb-8">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Market Analysis</h4>
            <Paragraph className="text-gray-600">
              Based on AI analysis, the North American market has the highest demand for your products with a conversion rate of 28%.
              The European market, while competitive, has higher customer quality and larger average order values.
            </Paragraph>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Customer Behavior Insights</h4>
            <Paragraph className="text-gray-600">
              High-value customers typically engage within 48 hours of initial contact. 
              The most effective outreach channels are personalized emails (32% response rate) and LinkedIn connections (28% response rate).
            </Paragraph>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Performance Recommendations</h4>
            <Paragraph className="text-gray-600">
              Focus on the manufacturing sector in North America, optimize follow-up timing to 3-5 days, 
              and prioritize prospects with annual revenue over $10M for higher conversion potential.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Analytics
