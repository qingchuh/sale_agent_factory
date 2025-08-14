import React from 'react'
import { Card, Row, Col, Statistic, Typography, Progress } from 'antd'
import { UserOutlined, GlobalOutlined, TrendingUpOutlined, CheckCircleOutlined } from '@ant-design/icons'

const { Title } = Typography

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Title level={1}>数据分析</Title>
      
      {/* 关键指标 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总潜在客户"
              value={156}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress percent={75} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="转化率"
              value={23.5}
              suffix="%"
              prefix={<TrendingUpOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={23.5} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃市场"
              value={8}
              suffix="个"
              prefix={<GlobalOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <Progress percent={80} size="small" className="mt-2" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="成功案例"
              value={37}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Progress percent={37} size="small" className="mt-2" />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="客户来源分布">
            <div className="h-64 flex items-center justify-center text-gray-500">
              图表组件将在这里显示
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="市场表现趋势">
            <div className="h-64 flex items-center justify-center text-gray-500">
              图表组件将在这里显示
            </div>
          </Card>
        </Col>
      </Row>

      {/* 详细分析 */}
      <Card title="详细分析报告">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">市场分析</h4>
            <p className="text-gray-600">
              根据AI分析，北美市场对您的产品需求最高，转化率达到28%。
              欧洲市场虽然竞争激烈，但客户质量较高，平均订单价值较大。
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">客户画像</h4>
            <p className="text-gray-600">
              您的理想客户主要是年营收1000万以上的中型企业，
              注重产品质量和交付时间，对价格相对敏感。
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">优化建议</h4>
            <p className="text-gray-600">
              建议增加北美市场的投入，优化产品定价策略，
              加强质量认证展示，提升客户信任度。
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Analytics
