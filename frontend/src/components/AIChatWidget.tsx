import React, { useState, useRef, useEffect } from 'react'
import { Card, Input, Button, Avatar, Spin } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface Message {
  id: string
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

interface AIChatWidgetProps {
  title?: string
  placeholder?: string
  className?: string
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  title = 'AI Assistant',
  placeholder = 'How can I help you?',
  className = ''
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize AI welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: 'Hello! I am your AI business development assistant. I can help you:\n• Analyze customer data\n• Generate marketing strategies\n• Answer business questions\n• Provide market insights\n\nHow can I assist you today?',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  // Mock AI response generation
  const generateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello! How can I help you with your business development today?'
    }
    
    if (lowerInput.includes('lead') || lowerInput.includes('customer')) {
      return 'I can help you generate and qualify new leads. What industry or market are you targeting?'
    }
    
    if (lowerInput.includes('strategy') || lowerInput.includes('marketing')) {
      return 'I can develop personalized marketing strategies for your business. What specific goals do you have?'
    }
    
    if (lowerInput.includes('data') || lowerInput.includes('analytics')) {
      return 'I can help you analyze business data and generate insights. What metrics would you like to review?'
    }
    
    return 'I am here to help with your business development needs. You can ask me about lead generation, marketing strategies, business analytics, or any other business questions.'
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
      const aiResponse = await generateAIResponse(inputValue)
      
      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI response generation failed:', error)
      
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
    <Card 
      title={title} 
      className={`h-96 flex flex-col ${className}`}
      bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs ${message.type === 'ai' ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
              <Avatar
                icon={message.type === 'ai' ? <RobotOutlined /> : <UserOutlined />}
                className={message.type === 'ai' ? 'bg-blue-500' : 'bg-gray-500'}
                size="small"
              />
              <div className={`rounded-lg px-3 py-2 text-sm ${
                message.type === 'ai' 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-blue-500 text-white'
              }`}>
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <Avatar icon={<RobotOutlined />} className="bg-blue-500" size="small" />
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <Spin size="small" />
                <span className="ml-2 text-gray-600 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex space-x-2">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            autoSize={{ minRows: 1, maxRows: 3 }}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            loading={isLoading}
            disabled={!inputValue.trim() || isLoading}
            className="h-auto px-4"
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default AIChatWidget

