import React from 'react'
import { Row, Col, Card, Statistic, Progress, Button, Space } from 'antd'
import { 
  RocketOutlined, 
  UserOutlined, 
  GlobalOutlined, 
  TrendingUpOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const stats = [
    {
      title: '总潜在客户',
      value: 156,
      prefix: <UserOutlined />,
      suffix: '人',
      color: 'text-blue-600',
      change: '+12%',
      changeType: 'up' as const,
    },
    {
      title: '合格客户',
      value: 89,
      prefix: <UserOutlined />,
      suffix: '人',
      color: 'text-green-600',
      change: '+8%',
      changeType: 'up' as const,
    },
    {
      title: '转化率',
      value: 23.5,
      prefix: <TrendingUpOutlined />,
      suffix: '%',
      color: 'text-purple-600',
      change: '+2.1%',
      changeType: 'up' as const,
    },
    {
      title: '活跃市场',
      value: 8,
      prefix: <GlobalOutlined />,
      suffix: '个',
      color: 'text-orange-600',
      change: '+1',
      changeType: 'up' as const,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'lead_generated',
      title: '新潜在客户生成',
      description: 'AI发现了一个来自北美的消费电子品牌',
      time: '2分钟前',
      status: 'success',
    },
    {
      id: 2,
      type: 'outreach_sent',
      title: '客户开发邮件已发送',
      description: '向5个高价值潜在客户发送了个性化邮件',
      time: '15分钟前',
      status: 'info',
    },
    {
      id: 3,
      type: 'profile_updated',
      title: '工厂档案已更新',
      description: '产品线信息已同步到最新版本',
      time: '1小时前',
      status: 'warning',
    },
  ]

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              欢迎回来！ 🚀
            </h1>
            <p className="text-primary-100 text-lg">
              您的AI外贸业务开发助手正在为您工作，今天已经发现了3个新的商机
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">3</div>
            <div className="text-primary-100">今日新商机</div>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="hover:shadow-lg transition-shadow">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span className={stat.color}>{stat.prefix}</span>}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
              <div className="flex items-center mt-2">
                {stat.changeType === 'up' ? (
                  <ArrowUpOutlined className="text-green-500 mr-1" />
                ) : (
                  <ArrowDownOutlined className="text-red-500 mr-1" />
                )}
                <span className={`text-sm ${stat.changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-400 text-sm ml-1">vs 昨日</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 快速操作 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="快速操作" className="h-full">
            <Space direction="vertical" size="middle" className="w-full">
              <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                onClick={() => navigate('/onboarding')}
                className="w-full h-12 text-lg"
              >
                开始新的引导流程
              </Button>
              <Button 
                size="large" 
                icon={<GlobalOutlined />}
                onClick={() => navigate('/business-development')}
                className="w-full h-12 text-lg"
              >
                启动业务开发
              </Button>
              <Button 
                size="large" 
                icon={<UserOutlined />}
                onClick={() => navigate('/leads')}
                className="w-full h-12 text-lg"
              >
                查看潜在客户
              </Button>
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="系统状态" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>AI引擎状态</span>
                  <span className="text-green-500">运行中</span>
                </div>
                <Progress percent={100} status="success" size="small" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>网站分析</span>
                  <span className="text-green-500">正常</span>
                </div>
                <Progress percent={85} status="active" size="small" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>客户生成</span>
                  <span className="text-green-500">正常</span>
                </div>
                <Progress percent={92} status="active" size="small" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 最近活动 */}
      <Card title="最近活动">
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.title}</div>
                <div className="text-sm text-gray-600">{activity.description}</div>
                <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
