import React, { useState } from 'react'
import { Card, Form, Input, Button, Switch, Select, Typography, Row, Col, Divider, message, Alert } from 'antd'
import { SaveOutlined, KeyOutlined, GlobalOutlined, BellOutlined, ShieldOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

const Settings: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSave = async (values: any) => {
    setLoading(true)
    try {
      // 模拟保存
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('设置保存成功！')
    } catch (error) {
      message.error('保存失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Title level={1}>系统设置</Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          company_name: '优质制造工厂',
          contact_email: 'contact@factory.com',
          contact_phone: '+86-400-123-4567',
          timezone: 'Asia/Shanghai',
          language: 'zh-CN',
          notifications: true,
          auto_analysis: true,
          lead_scoring: true,
          content_optimization: true
        }}
      >
        {/* 基本信息 */}
        <Card title="基本信息" className="mb-6">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="company_name"
                label="公司名称"
                rules={[{ required: true, message: '请输入公司名称' }]}
              >
                <Input placeholder="请输入公司名称" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="contact_email"
                label="联系邮箱"
                rules={[
                  { required: true, message: '请输入联系邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
              >
                <Input placeholder="请输入联系邮箱" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="contact_phone"
                label="联系电话"
                rules={[{ required: true, message: '请输入联系电话' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="website"
                label="公司网站"
                rules={[{ type: 'url', message: '请输入有效的网站地址' }]}
              >
                <Input placeholder="请输入公司网站地址" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* AI配置 */}
        <Card title="AI配置" className="mb-6">
          <Alert
            message="AI功能配置"
            description="这些设置将影响AI助手的行为和性能"
            type="info"
            showIcon
            className="mb-4"
          />
          
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="openai_api_key"
                label="OpenAI API密钥"
                rules={[{ required: true, message: '请输入OpenAI API密钥' }]}
              >
                <Input.Password 
                  placeholder="请输入OpenAI API密钥"
                  prefix={<KeyOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="ai_model"
                label="AI模型"
                rules={[{ required: true, message: '请选择AI模型' }]}
              >
                <Select placeholder="请选择AI模型">
                  <Option value="gpt-4">GPT-4 (推荐)</Option>
                  <Option value="gpt-3.5-turbo">GPT-3.5 Turbo</Option>
                  <Option value="gpt-4-turbo">GPT-4 Turbo</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="max_tokens"
                label="最大Token数"
                rules={[{ required: true, message: '请输入最大Token数' }]}
              >
                <Input placeholder="4000" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="temperature"
                label="AI创造性"
                rules={[{ required: true, message: '请设置AI创造性' }]}
              >
                <Select placeholder="请选择AI创造性">
                  <Option value="0.1">保守 (0.1)</Option>
                  <Option value="0.3">平衡 (0.3)</Option>
                  <Option value="0.7">创新 (0.7)</Option>
                  <Option value="1.0">非常创新 (1.0)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 业务配置 */}
        <Card title="业务配置" className="mb-6">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="target_markets"
                label="目标市场"
                rules={[{ required: true, message: '请选择目标市场' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择目标市场"
                  prefix={<GlobalOutlined />}
                >
                  <Option value="north_america">北美</Option>
                  <Option value="europe">欧洲</Option>
                  <Option value="asia_pacific">亚太</Option>
                  <Option value="latin_america">拉美</Option>
                  <Option value="middle_east">中东</Option>
                  <Option value="africa">非洲</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="industries"
                label="目标行业"
                rules={[{ required: true, message: '请选择目标行业' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择目标行业"
                >
                  <Option value="electronics">消费电子</Option>
                  <Option value="home_appliances">家居用品</Option>
                  <Option value="industrial">工业设备</Option>
                  <Option value="automotive">汽车配件</Option>
                  <Option value="medical">医疗器械</Option>
                  <Option value="textile">纺织服装</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="min_revenue"
                label="最低客户营收"
                rules={[{ required: true, message: '请设置最低客户营收' }]}
              >
                <Select placeholder="请选择最低客户营收">
                  <Option value="1000000">100万美元</Option>
                  <Option value="5000000">500万美元</Option>
                  <Option value="10000000">1000万美元</Option>
                  <Option value="50000000">5000万美元</Option>
                  <Option value="100000000">1亿美元</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lead_scoring_threshold"
                label="客户评分阈值"
                rules={[{ required: true, message: '请设置客户评分阈值' }]}
              >
                <Select placeholder="请选择客户评分阈值">
                  <Option value="60">60分</Option>
                  <Option value="70">70分</Option>
                  <Option value="80">80分 (推荐)</Option>
                  <Option value="90">90分</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 功能开关 */}
        <Card title="功能开关" className="mb-6">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="notifications"
                label="系统通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="auto_analysis"
                label="自动网站分析"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lead_scoring"
                label="自动客户评分"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="content_optimization"
                label="内容自动优化"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 系统配置 */}
        <Card title="系统配置" className="mb-6">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="timezone"
                label="时区设置"
                rules={[{ required: true, message: '请选择时区' }]}
              >
                <Select placeholder="请选择时区">
                  <Option value="Asia/Shanghai">中国标准时间 (UTC+8)</Option>
                  <Option value="America/New_York">美国东部时间 (UTC-5)</Option>
                  <Option value="Europe/London">英国时间 (UTC+0)</Option>
                  <Option value="Asia/Tokyo">日本时间 (UTC+9)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="language"
                label="语言设置"
                rules={[{ required: true, message: '请选择语言' }]}
              >
                <Select placeholder="请选择语言">
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="en-US">English</Option>
                  <Option value="ja-JP">日本語</Option>
                  <Option value="ko-KR">한국어</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="data_retention"
                label="数据保留期限"
                rules={[{ required: true, message: '请设置数据保留期限' }]}
              >
                <Select placeholder="请选择数据保留期限">
                  <Option value="30">30天</Option>
                  <Option value="90">90天</Option>
                  <Option value="365">1年</Option>
                  <Option value="1095">3年</Option>
                  <Option value="0">永久保留</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="backup_frequency"
                label="备份频率"
                rules={[{ required: true, message: '请设置备份频率' }]}
              >
                <Select placeholder="请选择备份频率">
                  <Option value="daily">每日</Option>
                  <Option value="weekly">每周</Option>
                  <Option value="monthly">每月</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 保存按钮 */}
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            className="h-12 px-8 text-lg"
          >
            {loading ? '保存中...' : '保存所有设置'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Settings
