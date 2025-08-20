import React, { useState } from 'react'
import { Card, Button, Progress, Typography, Tag, Avatar, List, Steps } from 'antd'
import { 
  RocketOutlined, 
  UserOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Step } = Steps

interface BusinessProcess {
  key: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  progress: number
  estimatedTime: string
  currentStep?: string
}

const BusinessDevelopment: React.FC = () => {
  const [activeProcess, setActiveProcess] = useState<string | null>(null)
  const [processes, setProcesses] = useState<BusinessProcess[]>([
    { key: 'market_analysis', name: 'Market Analysis', description: 'Analyze target market trends and opportunities', status: 'completed', progress: 100, estimatedTime: '2-3 days' },
    { key: 'lead_generation', name: 'Lead Discovery', description: 'AI automatically discovers potential customers', status: 'in_progress', progress: 65, estimatedTime: '1-2 weeks', currentStep: 'Scanning global companies' },
    { key: 'qualification', name: 'Lead Qualification', description: 'Evaluate customer quality and match score', status: 'pending', progress: 0, estimatedTime: '3-5 days' },
    { key: 'content_creation', name: 'Content Creation', description: 'Generate personalized marketing content', status: 'pending', progress: 0, estimatedTime: '2-3 days' },
    { key: 'outreach', name: 'Customer Outreach', description: 'Multi-channel customer contact', status: 'pending', progress: 0, estimatedTime: '1-2 weeks' }
  ])

  // Simulate business development process
  const startProcess = (processKey: string) => {
    setActiveProcess(processKey)
    
    // Simulate processing time for each stage
    const interval = setInterval(() => {
      setProcesses(prev => prev.map(p => {
        if (p.key === processKey && p.status === 'pending') {
          return { ...p, status: 'in_progress', progress: 10 }
        }
        if (p.key === processKey && p.status === 'in_progress') {
          const newProgress = Math.min(p.progress + 10, 100)
          const newStatus = newProgress === 100 ? 'completed' : 'in_progress'
          return { ...p, progress: newProgress, status: newStatus }
        }
        return p
      }))
    }, 1000)

    // If it's the lead discovery stage, simulate generating some customers
    if (processKey === 'lead_generation') {
      setTimeout(() => {
        setProcesses(prev => prev.map(p => {
          if (p.key === 'qualification') {
            return { ...p, status: 'in_progress', progress: 20, currentStep: 'Evaluating discovered leads' }
          }
          return p
        }))
      }, 5000)
    }

    // Clear interval after completion
    setTimeout(() => {
      clearInterval(interval)
      setActiveProcess(null)
    }, 15000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'in_progress': return 'processing'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleOutlined />
      case 'in_progress': return <ClockCircleOutlined />
      default: return <ClockCircleOutlined />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <Title level={2}>Business Development Pipeline</Title>
        <Paragraph className="text-lg text-gray-600">
          AI-powered business development workflow management
        </Paragraph>
      </div>

      {/* Process Overview */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={4} className="mb-2">Current Pipeline Status</Title>
            <Text type="secondary">Track your business development progress in real-time</Text>
          </div>
          <Button type="primary" icon={<RocketOutlined />} size="large">
            Launch All Processes
          </Button>
        </div>

        <Steps current={processes.findIndex(p => p.status === 'in_progress')} className="mb-8">
          {processes.map((process) => (
            <Step
              key={process.key}
              title={process.name}
              description={process.description}
              status={getStatusColor(process.status) as any}
              icon={getStatusIcon(process.status)}
            />
          ))}
        </Steps>
      </Card>

      {/* Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processes.map((process) => (
          <Card
            key={process.key}
            className={`hover:shadow-lg transition-shadow ${
              activeProcess === process.key ? 'ring-2 ring-blue-500' : ''
            }`}
            actions={[
              <Button
                key="start"
                type={process.status === 'pending' ? 'primary' : 'default'}
                disabled={process.status !== 'pending'}
                onClick={() => startProcess(process.key)}
                block
              >
                {process.status === 'pending' ? 'Start Process' : 
                 process.status === 'in_progress' ? 'In Progress' : 'Completed'}
              </Button>
            ]}
          >
            <div className="text-center mb-4">
              <Avatar 
                size={64} 
                icon={<UserOutlined />} 
                className={`mb-2 ${
                  process.status === 'completed' ? 'bg-green-500' :
                  process.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
              <Title level={4} className="mb-1">{process.name}</Title>
              <Text type="secondary" className="text-sm">{process.description}</Text>
            </div>

            <div className="space-y-3">
              <div>
                <Text strong>Status:</Text>
                <Tag 
                  color={getStatusColor(process.status)} 
                  className="ml-2"
                >
                  {process.status.replace('_', ' ').toUpperCase()}
                </Tag>
              </div>

              <div>
                <Text strong>Progress:</Text>
                <Progress 
                  percent={process.progress} 
                  size="small" 
                  className="mt-1"
                  strokeColor={
                    process.status === 'completed' ? '#52c41a' :
                    process.status === 'in_progress' ? '#1890ff' : '#d9d9d9'
                  }
                />
              </div>

              <div>
                <Text strong>Estimated Time:</Text>
                <div className="text-sm text-gray-600 mt-1">{process.estimatedTime}</div>
              </div>

              {process.currentStep && (
                <div>
                  <Text strong>Current Step:</Text>
                  <div className="text-sm text-gray-600 mt-1">{process.currentStep}</div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" className="mt-8">
        <List
          itemLayout="horizontal"
          dataSource={[
            { action: 'Market analysis completed', time: '2 hours ago', status: 'success' },
            { action: 'Lead discovery in progress', time: '5 hours ago', status: 'processing' },
            { action: 'New leads qualified', time: '1 day ago', status: 'success' },
            { action: 'Outreach campaign launched', time: '2 days ago', status: 'success' }
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={item.status === 'success' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                    className={item.status === 'success' ? 'bg-green-500' : 'bg-blue-500'}
                  />
                }
                title={item.action}
                description={item.time}
              />
              <Tag color={item.status === 'success' ? 'green' : 'blue'}>
                {item.status === 'success' ? 'Completed' : 'In Progress'}
              </Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default BusinessDevelopment
