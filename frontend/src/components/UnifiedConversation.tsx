import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, Typography, Avatar, Spin } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import { openaiService } from '../services/openaiService'

const { Title, Text } = Typography
const { TextArea } = Input

interface Message {
  id: string
  type: 'ai' | 'user'
  content: string
  timestamp: Date
  components?: React.ReactNode
}

const UnifiedConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize AI welcome messages
  useEffect(() => {
    const welcomeMessages: Message[] = [
      {
        id: '1',
        type: 'ai',
        content: 'Hello! I am your AI business development assistant FactoryLink. I can help you with lead generation, strategy development, business analytics, and more. How can I assist you today?',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'ai',
        content: 'I can help you:\n• Generate and qualify new leads\n• Develop outreach strategies\n• Analyze business metrics\n• Update company profiles\n\nWhat would you like to work on?',
        timestamp: new Date()
      }
    ]
    setMessages(welcomeMessages)
  }, [])

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
      const response = await openaiService.sendMessage(inputValue)
      
      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        type: 'ai',
        content: response.content,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Title level={3} className="mb-1">AI Business Development Assistant</Title>
            <Text type="secondary">Your unified conversational AI business partner</Text>
          </div>
          
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Enter OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-64"
              onPressEnter={() => {
                if (apiKey) {
                  localStorage.setItem('openai_api_key', apiKey)
                }
              }}
            />
            <Button 
              type="primary" 
              onClick={() => {
                if (apiKey) {
                  localStorage.setItem('openai_api_key', apiKey)
                }
              }}
            >
              Set API Key
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Main Chat */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                    <div className={`rounded-lg px-4 py-3 ${
                      message.type === 'ai' 
                        ? 'bg-white border text-gray-800' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      <div className="whitespace-pre-line">{message.content}</div>
                      {message.components && (
                        <div className="mt-3">
                          {message.components}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <Avatar icon={<RobotOutlined />} className="bg-blue-500" />
                    <div className="bg-white border rounded-lg px-4 py-3">
                      <Spin size="small" />
                      <span className="ml-2 text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-6">
              <div className="flex space-x-3">
                <TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here... Ask me about lead generation, business strategy, or any business development questions..."
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  loading={isLoading}
                  disabled={!inputValue.trim() || isLoading}
                  className="h-auto px-6"
                  size="large"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnifiedConversation
