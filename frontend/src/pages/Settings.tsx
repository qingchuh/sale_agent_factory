import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, Row, Col, message, Switch, Select } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const Settings: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Settings saved successfully!')
    } catch (error) {
      message.error('Save failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  const initialValues = {
    company_name: 'Premium Manufacturing Factory',
    contact_email: 'contact@premiumfactory.com',
    contact_phone: '+1-555-0123',
    company_website: 'https://premiumfactory.com',
    target_markets: ['North America', 'Europe'],
    notifications_enabled: true,
    ai_auto_discovery: true,
    language: 'en'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Title level={1}>System Settings</Title>
        <Text className="text-lg text-gray-600">
          Configure your business profile and system preferences
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSave}
      >
        {/* Basic Information */}
        <Card title="Basic Information" className="mb-6">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="company_name"
                label="Company Name"
                rules={[{ required: true, message: 'Please enter company name' }]}
              >
                <Input placeholder="Please enter company name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="contact_email"
                label="Contact Email"
                rules={[
                  { required: true, message: 'Please enter contact email' },
                  { type: 'email', message: 'Please enter a valid email address' }
                ]}
              >
                <Input placeholder="Please enter contact email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="contact_phone"
                label="Contact Phone"
                rules={[{ required: true, message: 'Please enter contact phone' }]}
              >
                <Input placeholder="Please enter contact phone" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="company_website"
                label="Company Website"
              >
                <Input placeholder="https://yourcompany.com" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Business Settings */}
        <Card title="Business Settings" className="mb-6">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="target_markets"
                label="Target Markets"
              >
                <Select
                  mode="multiple"
                  placeholder="Select target markets"
                  options={[
                    { label: 'North America', value: 'North America' },
                    { label: 'Europe', value: 'Europe' },
                    { label: 'Asia Pacific', value: 'Asia Pacific' },
                    { label: 'Latin America', value: 'Latin America' },
                    { label: 'Middle East', value: 'Middle East' }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="language"
                label="Language"
              >
                <Select placeholder="Select language">
                  <Option value="en">English</Option>
                  <Option value="zh">Chinese</Option>
                  <Option value="es">Español</Option>
                  <Option value="fr">Français</Option>
                  <Option value="de">Deutsch</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* System Preferences */}
        <Card title="System Preferences" className="mb-6">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="notifications_enabled"
                label="Enable Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="ai_auto_discovery"
                label="AI Auto Discovery"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Text type="secondary" className="text-sm">
            AI Auto Discovery will automatically scan for new business opportunities based on your profile
          </Text>
        </Card>

        {/* Save Button */}
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            htmlType="submit"
            loading={loading}
            className="px-8 h-12 text-lg"
          >
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Settings
