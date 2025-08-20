// OpenAI Service - Handle communication with OpenAI API
import { OPENAI_CONFIG, getStoredAPIKey, storeAPIKey } from '../config/openai'

export interface OpenAIResponse {
  content: string
  error?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

class OpenAIService {
  private apiKey: string | null = null
  private model: string = OPENAI_CONFIG.model
  private baseURL: string = OPENAI_CONFIG.base_url

  constructor() {
    // Get API key from local storage
    this.apiKey = getStoredAPIKey()
  }

  setAPIKey(apiKey: string) {
    this.apiKey = apiKey
    storeAPIKey(apiKey)
  }

  // Check if API key is configured
  hasAPIKey(): boolean {
    if (!this.apiKey) {
      console.warn('OpenAI API key not configured, will use mock responses')
      return false
    }
    return true
  }

  // Send message to OpenAI
  async sendMessage(message: string, context?: ChatMessage[]): Promise<OpenAIResponse> {
    // If no API key, return mock response
    if (!this.hasAPIKey()) {
      return this.getMockResponse(message)
    }

    try {
      // Build message history
      const messages: ChatMessage[] = [
        { role: 'system', content: OPENAI_CONFIG.system_prompt },
        ...(context || []),
        { role: 'user', content: message }
      ]

      // Call OpenAI API
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          max_tokens: OPENAI_CONFIG.max_tokens,
          temperature: OPENAI_CONFIG.temperature
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I did not get a valid response.'

      return { content: aiResponse }

    } catch (error) {
      console.error('OpenAI API call failed:', error)
      
      // If API call fails, return mock response
      return this.getMockResponse(message)
    }
  }

  // Mock response (used when no API key or API call fails)
  private getMockResponse(message: string): OpenAIResponse {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return { content: 'Hello! I am your AI business development assistant. How can I help you today?' }
    }
    
    if (lowerMessage.includes('lead') || lowerMessage.includes('customer')) {
      return { content: 'I can help you generate and qualify new leads. What industry or market are you targeting?' }
    }
    
    if (lowerMessage.includes('strategy') || lowerMessage.includes('outreach')) {
      return { content: 'I can develop personalized outreach strategies for your prospects. Which customer would you like me to analyze?' }
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('analytics')) {
      return { content: 'I can help you analyze business data and generate reports. What specific metrics would you like to review?' }
    }
    
    return { content: 'I am here to help with your business development needs. You can ask me about lead generation, strategy development, business analytics, or any other business development questions.' }
  }

  getConfig() {
    return {
      hasAPIKey: this.hasAPIKey(),
      model: this.model,
      baseURL: this.baseURL
    }
  }
}

export const openaiService = new OpenAIService()
