import React, { useState } from 'react'
import { Card, Button, Modal, Typography, Progress, Tag, Avatar } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

// Mock company profile data - in actual projects this would be retrieved from Onboarding page or API
const mockCompanyProfile = {
  company_name: 'Premium Manufacturing Factory',
  main_products: ['Electronics', 'Home Appliances', 'Industrial Equipment'],
  core_advantages: ['High-Quality Manufacturing Process', 'Fast Delivery Capability', 'Cost Advantage', 'Technical Leadership'],
  certifications: ['ISO9001 Quality Management System', 'CE Certification', 'RoHS Environmental Certification', 'UL Safety Certification'],
  ideal_customer_profile: 'North American consumer electronics brands with annual revenue over $10M, focusing on product quality',
  target_markets: 'North America, Europe, Southeast Asia',
}

// Mock leads data
const mockLeads = [
  {
    id: 1,
    name: 'EcoPack Solutions',
    country: 'United States',
    industry: 'Packaging Materials',
    description: 'Innovative company focused on providing eco-friendly packaging solutions for DTC brands',
    contact: 'Sarah Miller',
    title: 'Procurement Manager',
    email: 'sarah@ecopacksolutions.com',
    phone: '+1-555-0123',
    website: 'https://ecopacksolutions.com',
    matchScore: 88,
    status: 'New',
    lastContact: '2024-01-15',
    nextAction: 'Send initial outreach email'
  },
  {
    id: 2,
    name: 'Nordic Design Co.',
    country: 'Germany',
    industry: 'Home Furnishings',
    description: 'Premium home furnishings brand known for sustainable design and quality craftsmanship',
    contact: 'Erik Johansson',
    title: 'Supply Chain Director',
    email: 'erik@nordicdesign.de',
    phone: '+49-30-123456',
    website: 'https://nordicdesign.de',
    matchScore: 92,
    status: 'Contacted',
    lastContact: '2024-01-20',
    nextAction: 'Follow up on proposal'
  },
  {
    id: 3,
    name: 'TechFlow Systems',
    country: 'Canada',
    industry: 'Industrial Automation',
    description: 'Leading provider of industrial automation solutions for manufacturing sector',
    contact: 'Michael Chen',
    title: 'Operations Manager',
    email: 'mchen@techflow.ca',
    phone: '+1-416-789012',
    website: 'https://techflow.ca',
    matchScore: 85,
    status: 'Qualified',
    lastContact: '2024-01-18',
    nextAction: 'Schedule technical review meeting'
  }
]

interface AIStrategy {
  overview: string
  approach: string
  keyMessages: string[]
  timeline: string
  confidence: number
  nextSteps: string[]
}

const Leads: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [aiStrategy, setAiStrategy] = useState<AIStrategy | null>(null)
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false)

  // Generate AI strategy for selected lead
  const generateAIStrategy = async (lead: any) => {
    setIsGeneratingStrategy(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const strategy: AIStrategy = {
      overview: `Based on ${lead.name}'s profile and your company's strengths, this represents a high-potential opportunity with a ${lead.matchScore}% match score.`,
      approach: 'Multi-channel outreach strategy combining personalized email, LinkedIn engagement, and industry event networking.',
      keyMessages: [
        `Highlight your ${mockCompanyProfile.core_advantages[0]} and ${mockCompanyProfile.core_advantages[1]}`,
        'Emphasize cost advantages and quick delivery capabilities',
        'Showcase relevant certifications and quality standards',
        'Provide case studies from similar industries'
      ],
      timeline: '2-3 weeks for initial response, 4-6 weeks for qualification',
      confidence: lead.matchScore / 100,
      nextSteps: [
        'Send personalized outreach email within 24 hours',
        'Connect on LinkedIn and engage with company content',
        'Research upcoming industry events for networking opportunities',
        'Prepare detailed capability presentation'
      ]
    }
    
    setAiStrategy(strategy)
    setIsGeneratingStrategy(false)
  }

  const handleGetStrategy = (lead: any) => {
    setSelectedLead(lead)
    setIsModalVisible(true)
    generateAIStrategy(lead)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <Title level={2}>AI Outreach Strategist</Title>
        <Paragraph className="text-lg text-gray-600">
          Your AI-powered lead management and outreach strategy center
        </Paragraph>
      </div>

      {/* Company Profile Summary */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <Title level={4} className="text-blue-800 mb-2">
              {mockCompanyProfile.company_name}
            </Title>
            <div className="space-y-1 text-sm text-blue-700">
              <div><strong>Products:</strong> {mockCompanyProfile.main_products.join(', ')}</div>
              <div><strong>Target Markets:</strong> {mockCompanyProfile.target_markets}</div>
              <div><strong>Ideal Customer:</strong> {mockCompanyProfile.ideal_customer_profile}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{mockLeads.length}</div>
            <div className="text-sm text-blue-600">Active Leads</div>
          </div>
        </div>
      </Card>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLeads.map((lead) => (
          <Card 
            key={lead.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            actions={[
              <Button 
                key="strategy" 
                type="primary" 
                icon={<MailOutlined />}
                onClick={() => handleGetStrategy(lead)}
                block
              >
                Get AI Strategy
              </Button>
            ]}
          >
            <div className="text-center mb-4">
              <Avatar size={64} icon={<UserOutlined />} className="mb-2" />
              <Title level={4} className="mb-1">{lead.name}</Title>
              <Tag color="blue">{lead.country}</Tag>
              <Tag color="green">{lead.industry}</Tag>
            </div>

            <div className="space-y-3">
              <div>
                <Text strong>Contact:</Text>
                <div className="text-sm text-gray-600">{lead.contact} - {lead.title}</div>
              </div>
              
              <div>
                <Text strong>Match Score:</Text>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress 
                    percent={lead.matchScore} 
                    size="small" 
                    strokeColor={lead.matchScore >= 90 ? '#52c41a' : lead.matchScore >= 80 ? '#fa8c16' : '#f5222d'}
                  />
                  <span className="text-sm font-medium">{lead.matchScore}%</span>
                </div>
              </div>

              <div>
                <Text strong>Status:</Text>
                <Tag 
                  color={
                    lead.status === 'New' ? 'blue' : 
                    lead.status === 'Contacted' ? 'orange' : 
                    'green'
                  }
                  className="ml-2"
                >
                  {lead.status}
                </Tag>
              </div>

              <div>
                <Text strong>Next Action:</Text>
                <div className="text-sm text-gray-600 mt-1">{lead.nextAction}</div>
              </div>

              <div className="flex space-x-2 text-gray-500">
                <MailOutlined />
                <PhoneOutlined />
                <GlobalOutlined />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Strategy Modal */}
      <Modal
        title={`AI Strategy for ${selectedLead?.name}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {isGeneratingStrategy ? (
          <div className="text-center py-8">
            <div className="text-lg mb-4">🤖 AI is analyzing and generating your strategy...</div>
            <div className="text-sm text-gray-500">This may take a few moments</div>
          </div>
        ) : aiStrategy ? (
          <div className="space-y-6">
            {/* Strategy Overview */}
            <Card size="small" className="bg-blue-50">
              <Title level={5} className="text-blue-800 mb-2">Strategy Overview</Title>
              <Paragraph className="text-blue-700">{aiStrategy.overview}</Paragraph>
            </Card>

            {/* Approach */}
            <Card size="small" className="bg-green-50">
              <Title level={5} className="text-green-800 mb-2">Recommended Approach</Title>
              <Paragraph className="text-green-700">{aiStrategy.approach}</Paragraph>
            </Card>

            {/* Key Messages */}
            <Card size="small" className="bg-purple-50">
              <Title level={5} className="text-purple-800 mb-2">Key Messages to Emphasize</Title>
              <ul className="list-disc list-inside space-y-1 text-purple-700">
                {aiStrategy.keyMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </Card>

            {/* Timeline and Confidence */}
            <div className="grid grid-cols-2 gap-4">
              <Card size="small" className="bg-orange-50">
                <Title level={5} className="text-orange-800 mb-2">Expected Timeline</Title>
                <Text className="text-orange-700">{aiStrategy.timeline}</Text>
              </Card>
              <Card size="small" className="bg-indigo-50">
                <Title level={5} className="text-indigo-800 mb-2">Strategy Confidence</Title>
                <div className="flex items-center space-x-2">
                  <Progress 
                    percent={aiStrategy.confidence * 100} 
                    size="small" 
                    strokeColor="#6366f1"
                  />
                  <span className="text-sm font-medium text-indigo-700">
                    {(aiStrategy.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </Card>
            </div>

            {/* Next Steps */}
            <Card size="small" className="bg-teal-50">
              <Title level={5} className="text-teal-800 mb-2">Immediate Next Steps</Title>
              <div className="space-y-2">
                {aiStrategy.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <Text className="text-teal-700">{step}</Text>
                  </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="primary" size="large" block>
                Start Outreach Campaign
              </Button>
              <Button size="large" block>
                Save Strategy
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

export default Leads
