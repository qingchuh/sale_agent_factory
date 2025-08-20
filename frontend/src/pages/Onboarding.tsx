import React, { useState, useRef, useEffect } from 'react'
import { Card, Input, Button, Typography, Avatar, Spin, Alert } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography
const { TextArea } = Input

interface Message {
  id: string
  type: 'ai' | 'user'
  content: string
  timestamp: Date
  isAnalysis?: boolean
}

interface CompanyProfile {
  company_name: string
  main_products: string[]
  core_advantages: string[]
  certifications: string[]
  ideal_customer_profile?: string
  target_markets?: string
  contact_person?: string
  contact_title?: string
}

const Onboarding: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // const [isAnalysisMode, setIsAnalysisMode] = useState(false)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize AI welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: 'Hello! I am your AI business development assistant FactoryLink. Please enter your company\'s official website URL here so I can quickly understand your business.',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  // Simulate AI website analysis
  const analyzeWebsite = async (_url: string): Promise<CompanyProfile> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Simulate extracted information - in actual projects this would call real AI analysis API
    return {
      company_name: 'Premium Manufacturing Factory',
      main_products: ['Electronics', 'Home Appliances', 'Industrial Equipment'],
      core_advantages: ['High-Quality Manufacturing Process', 'Fast Delivery Capability', 'Cost Advantage', 'Technical Leadership'],
      certifications: ['ISO9001 Quality Management System', 'CE Certification', 'RoHS Environmental Certification', 'UL Safety Certification']
    }
  }

  // Generate AI analysis summary
  const generateAnalysisSummary = (profile: CompanyProfile): string => {
    return `## Company Advantages Summary

**🏢 Company Profile**
${profile.company_name} - A modern factory focused on high-quality manufacturing

**📦 Core Products**
${profile.main_products.join(', ')}

**⭐ Core Advantages (USP)**
${profile.core_advantages.map(adv => `• ${adv}`).join('\n')}

**🏆 Certifications & Credentials**
${profile.certifications.join(', ')}

Please review and feel free to modify any inaccuracies. After confirmation, please tell me which type of global brands you would like to connect with? (The more specific the description, the better)`
  }

  // Handle user input
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Check if it's a website URL
      if (inputValue.includes('http') && !companyProfile) {
        // Website analysis mode
        // setIsAnalysisMode(true)
        
        const aiThinkingMessage: Message = {
          id: Date.now().toString() + '_thinking',
          type: 'ai',
          content: '🔍 Analyzing your website, please wait...',
          timestamp: new Date(),
          isAnalysis: true
        }
        
        setMessages(prev => [...prev, aiThinkingMessage])
        
        const profile = await analyzeWebsite(inputValue)
        setCompanyProfile(profile)
        
        // Remove thinking message, add analysis result
        setMessages(prev => prev.filter(msg => !msg.isAnalysis))
        
        const analysisMessage: Message = {
          id: Date.now().toString() + '_analysis',
          type: 'ai',
          content: generateAnalysisSummary(profile),
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, analysisMessage])
        // setIsAnalysisMode(false)
        
      } else if (companyProfile && !isProfileComplete) {
        // Information confirmation and completion mode
        const aiResponseMessage: Message = {
          id: Date.now().toString() + '_response',
          type: 'ai',
          content: `Received! Your profile has been updated and locked. Now launching global business development for you.

🎯 Configuration complete! AI assistant is about to start finding global business opportunities for you.`,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, aiResponseMessage])
        setIsProfileComplete(true)
        
        // Delay navigation to business development page
        setTimeout(() => {
          navigate('/business-development')
        }, 2000)
      }
      
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        type: 'ai',
        content: 'Sorry, we encountered an issue during analysis. Please check if the website address is correct, or try again later.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Enter key to send
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Title level={1}>AI-Guided Configuration</Title>
        <Paragraph className="text-lg text-gray-600">
          Chat with AI to complete your factory profile configuration
        </Paragraph>
      </div>

      {/* Chat Window */}
      <Card className="h-96 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'ai' ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                  <Avatar
                    icon={message.type === 'ai' ? <RobotOutlined /> : <UserOutlined />}
                    className={message.type === 'ai' ? 'bg-blue-500' : 'bg-gray-500'}
                  />
                  <div className={`rounded-lg px-4 py-2 ${
                    message.type === 'ai' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {message.content.includes('##') ? (
                      <div className="whitespace-pre-line">
                        {message.content.split('##').map((part, index) => {
                          if (index === 0) return null
                          const [title, ...content] = part.split('\n')
                          return (
                            <div key={index} className="mb-4">
                              <h4 className="font-semibold text-lg mb-2">{title}</h4>
                              <div className="text-sm space-y-1">
                                {content.map((line, lineIndex) => (
                                  <div key={lineIndex}>{line}</div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">{message.content}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <Avatar icon={<RobotOutlined />} className="bg-blue-500" />
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <Spin size="small" />
                    <span className="ml-2 text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <TextArea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={companyProfile ? "Please describe your ideal customer profile..." : "Please enter your company website address..."}
                autoSize={{ minRows: 1, maxRows: 4 }}
                disabled={isLoading || isProfileComplete}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                loading={isLoading}
                disabled={!inputValue.trim() || isLoading || isProfileComplete}
                className="h-auto px-4"
              >
                Send
              </Button>
            </div>
            
            {isProfileComplete && (
              <Alert
                message="Configuration Complete!"
                description="Redirecting to business development page..."
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                className="mt-3"
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Onboarding
