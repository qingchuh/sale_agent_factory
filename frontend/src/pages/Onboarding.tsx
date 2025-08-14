import React, { useState } from 'react'
import { Card, Form, Input, Button, Steps, message, Row, Col, Typography, Alert } from 'antd'
import { RocketOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography
const { Step } = Steps

interface OnboardingData {
  website_url: string
  company_name: string
  main_products: string[]
  core_advantages: string[]
  ideal_customer_profile: string
  target_markets: string[]
  contact_person: string
  contact_title: string
}

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const steps = [
    {
      title: '网站分析',
      description: 'AI自动分析您的网站',
      icon: <RocketOutlined />,
    },
    {
      title: '信息确认',
      description: '确认提取的信息',
      icon: <CheckCircleOutlined />,
    },
    {
      title: '档案完善',
      description: '补充关键信息',
      icon: <CheckCircleOutlined />,
    },
    {
      title: '完成配置',
      description: '开始AI业务开发',
      icon: <CheckCircleOutlined />,
    },
  ]

  const handleWebsiteAnalysis = async (values: { website_url: string }) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 模拟提取的信息
      const extractedInfo = {
        company_name: '优质制造工厂',
        main_products: ['电子产品', '家居用品', '工业设备'],
        core_advantages: ['高质量', '快速交付', '成本优势'],
        certifications: ['ISO9001', 'CE认证'],
      }
      
      form.setFieldsValue({
        company_name: extractedInfo.company_name,
        main_products: extractedInfo.main_products,
        core_advantages: extractedInfo.core_advantages,
      })
      
      message.success('网站分析完成！')
      setCurrentStep(1)
    } catch (error) {
      message.error('网站分析失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmInfo = () => {
    setCurrentStep(2)
  }

  const handleCompleteProfile = async (values: OnboardingData) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('工厂档案配置完成！')
      setCurrentStep(3)
      
      // 延迟跳转到业务开发页面
      setTimeout(() => {
        navigate('/business-development')
      }, 1500)
    } catch (error) {
      message.error('配置失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <RocketOutlined className="text-6xl text-primary-500 mb-4" />
              <Title level={2}>开始您的AI之旅</Title>
              <Paragraph className="text-gray-600">
                只需提供您的公司网站，AI就能自动分析并提取关键信息
              </Paragraph>
            </div>
            
            <Form
              form={form}
              onFinish={handleWebsiteAnalysis}
              layout="vertical"
            >
              <Form.Item
                name="website_url"
                label="公司网站地址"
                rules={[
                  { required: true, message: '请输入网站地址' },
                  { type: 'url', message: '请输入有效的网站地址' }
                ]}
              >
                <Input 
                  placeholder="例如: https://www.yourcompany.com" 
                  size="large"
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  size="large" 
                  htmlType="submit"
                  loading={loading}
                  icon={<RocketOutlined />}
                  className="w-full h-12 text-lg"
                >
                  {loading ? 'AI正在分析中...' : '开始AI分析'}
                </Button>
              </Form.Item>
            </Form>
            
            {loading && (
              <Alert
                message="AI正在分析您的网站"
                description="正在访问网站、提取信息、分析内容...请稍候"
                type="info"
                showIcon
                icon={<LoadingOutlined spin />}
                className="mt-4"
              />
            )}
          </Card>
        )
        
      case 1:
        return (
          <Card className="max-w-4xl mx-auto">
            <Title level={3} className="mb-6">AI提取的信息</Title>
            
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item label="公司名称">
                  <Input value={form.getFieldValue('company_name')} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="主要产品">
                  <Input value={form.getFieldValue('main_products')?.join(', ')} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="核心优势">
                  <Input value={form.getFieldValue('core_advantages')?.join(', ')} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="认证信息">
                  <Input value="ISO9001, CE认证" readOnly />
                </Form.Item>
              </Col>
            </Row>
            
            <div className="text-center mt-8">
              <Button 
                type="primary" 
                size="large"
                onClick={handleConfirmInfo}
                className="h-12 px-8 text-lg"
              >
                信息正确，继续下一步
              </Button>
            </div>
          </Card>
        )
        
      case 2:
        return (
          <Card className="max-w-4xl mx-auto">
            <Title level={3} className="mb-6">完善工厂档案</Title>
            
            <Form
              form={form}
              onFinish={handleCompleteProfile}
              layout="vertical"
            >
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Form.Item
                    name="ideal_customer_profile"
                    label="理想客户画像"
                    rules={[{ required: true, message: '请描述您的理想客户' }]}
                  >
                    <Input.TextArea 
                      placeholder="例如：北美消费电子品牌，年营收1000万以上，注重产品质量"
                      rows={3}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="target_markets"
                    label="目标市场"
                    rules={[{ required: true, message: '请选择目标市场' }]}
                  >
                    <Input placeholder="例如：北美、欧洲、东南亚" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="contact_person"
                    label="联系人姓名"
                    rules={[{ required: true, message: '请输入联系人姓名' }]}
                  >
                    <Input placeholder="例如：张三" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="contact_title"
                    label="联系人职位"
                    rules={[{ required: true, message: '请输入联系人职位' }]}
                  >
                    <Input placeholder="例如：海外业务经理" />
                  </Form.Item>
                </Col>
              </Row>
              
              <div className="text-center mt-8">
                <Button 
                  type="primary" 
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  className="h-12 px-8 text-lg"
                >
                  {loading ? '配置中...' : '完成配置，启动AI业务开发'}
                </Button>
              </div>
            </Form>
          </Card>
        )
        
      case 3:
        return (
          <Card className="max-w-2xl mx-auto text-center">
            <CheckCircleOutlined className="text-8xl text-green-500 mb-6" />
            <Title level={2} className="text-green-600 mb-4">
              配置完成！ 🎉
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-8">
              您的工厂档案已经配置完成，AI助手即将开始为您寻找全球商机
            </Paragraph>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/business-development')}
              className="h-12 px-8 text-lg"
            >
              开始AI业务开发
            </Button>
          </Card>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Title level={1}>AI引导配置</Title>
        <Paragraph className="text-lg text-gray-600">
          让AI了解您的工厂，开始智能化的外贸业务开发
        </Paragraph>
      </div>
      
      <Steps 
        current={currentStep} 
        items={steps}
        className="max-w-4xl mx-auto"
      />
      
      <div className="mt-8">
        {renderStepContent()}
      </div>
    </div>
  )
}

export default Onboarding
