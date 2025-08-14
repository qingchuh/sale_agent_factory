import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Select, Row, Col, Statistic, Typography } from 'antd'
import { SearchOutlined, FilterOutlined, ExportOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'

const { Title } = Typography
const { Search } = Input
const { Option } = Select

const Leads: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // 模拟数据
  const leads = [
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
      status: 'qualified',
      source: 'AI发现',
      lastContact: '2024-01-15',
      nextAction: '发送产品介绍'
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
      status: 'contacted',
      source: 'AI发现',
      lastContact: '2024-01-14',
      nextAction: '跟进报价'
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
      status: 'qualified',
      source: 'AI发现',
      lastContact: '2024-01-13',
      nextAction: '安排视频会议'
    },
    {
      id: 4,
      name: 'Nordic Design Co.',
      country: '瑞典',
      industry: '家居用品',
      revenue: '1500万欧元',
      contact: 'Erik Johansson',
      email: 'erik@nordicdesign.se',
      phone: '+46-8-123456',
      score: 78,
      status: 'prospecting',
      source: 'AI发现',
      lastContact: '2024-01-12',
      nextAction: '发送样品'
    },
    {
      id: 5,
      name: 'Australian Tech',
      country: '澳大利亚',
      industry: '消费电子',
      revenue: '4000万澳元',
      contact: 'Sarah Wilson',
      email: 'sarah@australiantech.au',
      phone: '+61-2-9876-5432',
      score: 91,
      status: 'qualified',
      source: 'AI发现',
      lastContact: '2024-01-11',
      nextAction: '准备合同'
    }
  ]

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a className="font-medium">{text}</a>,
    },
    {
      title: '国家/地区',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => <Tag color="blue">{country}</Tag>,
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry',
      render: (industry: string) => <Tag color="green">{industry}</Tag>,
    },
    {
      title: '年营收',
      dataIndex: 'revenue',
      key: 'revenue',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '评分',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => (
        <Tag color={score >= 90 ? 'green' : score >= 80 ? 'blue' : 'orange'}>
          {score}分
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          qualified: { color: 'green', text: '已筛选' },
          contacted: { color: 'blue', text: '已联系' },
          prospecting: { color: 'orange', text: '开发中' },
          converted: { color: 'purple', text: '已转化' }
        }
        const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: status }
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '最后联系',
      dataIndex: 'lastContact',
      key: 'lastContact',
    },
    {
      title: '下一步行动',
      dataIndex: 'nextAction',
      key: 'nextAction',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space size="small">
          <Button size="small" icon={<MailOutlined />}>
            邮件
          </Button>
          <Button size="small" icon={<PhoneOutlined />}>
            电话
          </Button>
          <Button size="small" type="primary">
            跟进
          </Button>
        </Space>
      ),
    },
  ]

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchText.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusCount = (status: string) => {
    return leads.filter(lead => lead.status === status).length
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={1}>潜在客户管理</Title>
        <Space>
          <Button icon={<ExportOutlined />}>导出数据</Button>
          <Button type="primary">添加客户</Button>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总客户数"
              value={leads.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已筛选客户"
              value={getStatusCount('qualified')}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="已联系客户"
              value={getStatusCount('contacted')}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="开发中客户"
              value={getStatusCount('prospecting')}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="搜索客户名称、联系人或邮箱"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="筛选状态"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
            >
              <Option value="all">全部状态</Option>
              <Option value="qualified">已筛选</Option>
              <Option value="contacted">已联系</Option>
              <Option value="prospecting">开发中</Option>
              <Option value="converted">已转化</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Space>
              <Button icon={<FilterOutlined />}>更多筛选</Button>
              <Button>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 客户列表 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredLeads}
          rowKey="id"
          pagination={{
            total: filteredLeads.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}

export default Leads
