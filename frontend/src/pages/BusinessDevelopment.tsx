import React, { useState } from 'react'
import { Card, Button, Row, Col, Progress, Tag, Typography, Space, Alert, List, Avatar, Statistic } from 'antd'
import { 
  GlobalOutlined, 
  SearchOutlined, 
  MessageOutlined, 
  CheckCircleOutlined,
  LoadingOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const BusinessDevelopment: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState('')
  const [leads, setLeads] = useState<any[]>([])

  const stages = [
    { key: 'market_analysis', name: '市场分析', description: '分析目标市场趋势和机会' },
    { key: 'lead_generation', name: '客户发现', description: 'AI自动发现潜在客户' },
    { key: 'qualification', name: '客户筛选', description: '评估客户质量和匹配度' },
    { key: 'content_creation', name: '内容创建', description: '生成个性化营销内容' },
    { key: 'outreach', name: '客户触达', description: '多渠道客户联系' },
  ]

  const handleStartBusinessDevelopment = async () => {
    setIsRunning(true)
    setProgress(0)
    setLeads([])
    
    // 模拟业务开发流程
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i]
      setCurrentStage(stage.key)
      
      // 模拟每个阶段的处理时间
      for (let j = 0; j <= 100; j += 10) {
        setProgress(j)
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      // 如果是客户发现阶段，模拟生成一些客户
      if (stage.key === 'lead_generation') {
        const mockLeads = [
          {
            id: 1,
            name: 'TechCorp Electronics',
            country: '美国',
            industry: '消费电子',
            revenue: '5000万美元',
            contact: 'John Smith',
            email: 'john@techcorp.com',
            phone: '+1-555-0123',
            score: 95,
            status: 'qualified'
          },
          {
            id: 2,
            name: 'EuroHome Solutions',
            country: '德国',
            industry: '家居用品',
            revenue: '3000万欧元',
            contact: 'Maria Schmidt',
            email: 'maria@eurohome.de',
            phone: '+49-30-123456',
            score: 88,
            status: 'qualified'
          },
          {
            id: 3,
            name: 'AsiaTech Industries',
            country: '新加坡',
            industry: '工业设备',
            revenue: '2000万新元',
            contact: 'David Chen',
            email: 'david@asiatech.sg',
            phone: '+65-6789-0123',
            score: 82,
            status: 'qualified'
          }
        ]
        setLeads(mockLeads)
      }
    }
    
    setIsRunning(false)
    setCurrentStage('')
    setProgress(100)
  }

  const getStageStatus = (stageKey: string) => {
    if (!isRunning) return 'waiting'
    if (currentStage === stageKey) return 'processing'
    if (stages.findIndex(s => s.key === stageKey) < stages.findIndex(s => s.key === currentStage)) {
      return 'finished'
    }
    return 'waiting'
  }

  const getStageIcon = (stageKey: string) => {
    const status = getStageStatus(stageKey)
    switch (status) {
      case 'finished':
        return <CheckCircleOutlined className="text-green-500" />
      case 'processing':
        return <LoadingOutlined spin className="text-blue-500" />
      default:
        return <GlobalOutlined className="text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={1}>AI业务开发</Title>
        <Paragraph className="text-lg text-gray-600">
          让AI为您自动发现、筛选和联系全球潜在客户
        </Paragraph>
      </div>

      {/* 控制面板 */}
      <Card>
        <div className="text-center">
          {!isRunning ? (
            <Button
              type="primary"
              size="large"
              icon={<GlobalOutlined />}
              onClick={handleStartBusinessDevelopment}
              className="h-12 px-8 text-lg"
            >
              启动AI业务开发
            </Button>
          ) : (
            <Alert
              message="AI业务开发进行中"
              description={`当前阶段: ${stages.find(s => s.key === currentStage)?.name}`}
              type="info"
              showIcon
              icon={<LoadingOutlined spin />}
            />
          )}
        </div>
      </Card>

      {/* 进度跟踪 */}
      <Card title="开发进度">
        <div className="space-y-6">
          {stages.map((stage, index) => (
            <div key={stage.key} className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                {getStageIcon(stage.key)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Text strong>{stage.name}</Text>
                  <Tag color={getStageStatus(stage.key) === 'finished' ? 'green' : 'blue'}>
                    {getStageStatus(stage.key) === 'finished' ? '完成' : 
                     getStageStatus(stage.key) === 'processing' ? '进行中' : '等待中'}
                  </Tag>
                </div>
                <Text type="secondary">{stage.description}</Text>
                {getStageStatus(stage.key) === 'processing' && (
                  <Progress percent={progress} size="small" className="mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 发现的客户 */}
      {leads.length > 0 && (
        <Card title="发现的潜在客户">
          <List
            dataSource={leads}
            renderItem={(lead) => (
              <List.Item
                actions={[
                  <Button key="message" type="primary" icon={<MessageOutlined />}>
                    发送消息
                  </Button>,
                  <Button key="email" icon={<MailOutlined />}>
                    发送邮件
                  </Button>,
                  <Button key="phone" icon={<PhoneOutlined />}>
                    电话联系
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={
                    <Space>
                      <span>{lead.name}</span>
                      <Tag color="blue">{lead.country}</Tag>
                      <Tag color="green">{lead.industry}</Tag>
                      <Tag color="orange">评分: {lead.score}</Tag>
                    </Space>
                  }
                  description={
                    <div className="space-y-1">
                      <div>年营收: {lead.revenue}</div>
                      <div>联系人: {lead.contact}</div>
                      <div>邮箱: {lead.email}</div>
                      <div>电话: {lead.phone}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      {/* 统计信息 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已发现客户"
              value={leads.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均评分"
              value={leads.length > 0 ? leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length : 0}
              precision={1}
              suffix="分"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="目标市场"
              value={leads.length > 0 ? new Set(leads.map(lead => lead.country)).size : 0}
              suffix="个"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="行业覆盖"
              value={leads.length > 0 ? new Set(leads.map(lead => lead.industry)).size : 0}
              suffix="个"
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default BusinessDevelopment
