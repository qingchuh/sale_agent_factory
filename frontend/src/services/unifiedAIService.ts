// Unified AI Business Partner Service

// Core business interfaces
export interface CompanyProfile {
  id: string
  name: string
  industry: string
  size: string
  location: string
  description: string
  website?: string
  contact_email?: string
  created_at: Date
  updated_at: Date
}

export interface CustomerProfile {
  id: string
  company_id: string
  name: string
  position: string
  company: string
  industry: string
  contact_info: {
    email: string
    phone?: string
    linkedin?: string
  }
  status: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed'
  source: string
  notes: string
  created_at: Date
  updated_at: Date
}

export interface StrategyReport {
  id: string
  title: string
  type: 'outreach' | 'follow_up' | 'proposal' | 'analysis'
  content: string
  target_customers: string[]
  success_metrics: string[]
  timeline: string
  created_at: Date
}

export interface BusinessMetrics {
  total_leads: number
  qualified_leads: number
  conversion_rate: number
  average_response_time: number
  revenue_pipeline: number
  customer_satisfaction: number
}

export interface AICommand {
  type: 'query' | 'action' | 'config'
  intent: string
  entities: string[]
  confidence: number
}

// In-memory data store for demo purposes
export class UnifiedAIDataStore {
  private companyProfile: CompanyProfile | null = null
  private customers: CustomerProfile[] = []
  private strategies: StrategyReport[] = []
  private conversationHistory: any[] = []

  // Company profile management
  setCompanyProfile(profile: CompanyProfile) {
    this.companyProfile = profile
  }

  getCompanyProfile(): CompanyProfile | null {
    return this.companyProfile
  }

  // Customer management
  addCustomer(customer: CustomerProfile) {
    this.customers.push(customer)
  }

  getCustomers(): CustomerProfile[] {
    return this.customers
  }

  // Strategy management
  addStrategy(strategy: StrategyReport) {
    this.strategies.push(strategy)
  }

  getStrategies(): StrategyReport[] {
    return this.strategies
  }

  // Business metrics calculation
  getBusinessMetrics(): BusinessMetrics {
    const totalLeads = this.customers.length
    const qualifiedLeads = this.customers.filter(c => c.status !== 'prospect').length
    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0
    
    return {
      total_leads: totalLeads,
      qualified_leads: qualifiedLeads,
      conversion_rate: conversionRate,
      average_response_time: 2.5, // Mock data
      revenue_pipeline: totalLeads * 10000, // Mock calculation
      customer_satisfaction: 85 // Mock data
    }
  }

  // Conversation history
  addConversationEntry(entry: any) {
    this.conversationHistory.push(entry)
  }

  getConversationHistory() {
    return this.conversationHistory
  }
}

// Global data store instance
export const dataStore = new UnifiedAIDataStore()

// AI command parser
export class AICommandParser {
  static parseCommand(userInput: string): AICommand {
    const lowerInput = userInput.toLowerCase()
    
    // Query commands
    if (lowerInput.includes('view') || lowerInput.includes('show') || lowerInput.includes('report')) {
      if (lowerInput.includes('customer') || lowerInput.includes('funnel') || lowerInput.includes('progress')) {
        return {
          type: 'query',
          intent: 'view_business_metrics',
          entities: ['business_metrics'],
          confidence: 0.9
        }
      }
      if (lowerInput.includes('data') || lowerInput.includes('statistics')) {
        return {
          type: 'query',
          intent: 'view_analytics',
          entities: ['analytics'],
          confidence: 0.8
        }
      }
    }
    
    // Action commands
    if (lowerInput.includes('generate') || lowerInput.includes('create') || lowerInput.includes('send')) {
      if (lowerInput.includes('customer') || lowerInput.includes('lead')) {
        return {
          type: 'action',
          intent: 'generate_leads',
          entities: ['leads'],
          confidence: 0.9
        }
      }
      if (lowerInput.includes('strategy') || lowerInput.includes('email')) {
        return {
          type: 'action',
          intent: 'generate_strategy',
          entities: ['strategy'],
          confidence: 0.8
        }
      }
    }
    
    // Configuration commands
    if (lowerInput.includes('update') || lowerInput.includes('modify') || lowerInput.includes('set')) {
      return {
        type: 'config',
        intent: 'update_profile',
        entities: ['profile'],
        confidence: 0.7
      }
    }
    
    // Default query
    return {
      type: 'query',
      intent: 'general_inquiry',
      entities: [],
      confidence: 0.5
    }
  }
}

// AI response generator
export class AIResponseGenerator {
  static async generateResponse(command: AICommand): Promise<{
    content: string
    components?: any
    quickActions?: any[]
  }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    switch (command.intent) {
      case 'view_business_metrics':
        return this.generateBusinessMetricsResponse()
      
      case 'generate_leads':
        return this.generateLeadsResponse()
      
      case 'generate_strategy':
        return this.generateStrategyResponse()
      
      case 'update_profile':
        return this.generateProfileUpdateResponse()
      
      default:
        return this.generateGeneralResponse()
    }
  }

  private static generateBusinessMetricsResponse() {
    const metrics = dataStore.getBusinessMetrics()
    return {
      content: `📊 **Business Metrics Overview**

**Total Leads:** ${metrics.total_leads}
**Qualified Leads:** ${metrics.qualified_leads}
**Conversion Rate:** ${metrics.conversion_rate.toFixed(1)}%
**Average Response Time:** ${metrics.average_response_time} hours
**Revenue Pipeline:** $${metrics.revenue_pipeline.toLocaleString()}
**Customer Satisfaction:** ${metrics.customer_satisfaction}%

Your lead generation is performing well! The conversion rate shows strong qualification process.`,
      components: null
    }
  }

  private static generateLeadsResponse() {
    const mockLeads = [
      {
        id: '1',
        name: 'John Smith',
        position: 'Procurement Manager',
        company: 'TechCorp Inc.',
        industry: 'Technology',
        status: 'prospect' as const
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        position: 'Supply Chain Director',
        company: 'Global Manufacturing Ltd.',
        industry: 'Manufacturing',
        status: 'qualified' as const
      }
    ]

    return {
      content: `🎯 **Generated Lead Recommendations**

Based on your company profile, here are 2 high-potential leads:

1. **John Smith** - Procurement Manager at TechCorp Inc.
   - Industry: Technology
   - Status: New Prospect
   - Match Score: 92%

2. **Sarah Johnson** - Supply Chain Director at Global Manufacturing Ltd.
   - Industry: Manufacturing  
   - Status: Qualified Lead
   - Match Score: 88%

Would you like me to generate personalized outreach strategies for these leads?`,
      components: mockLeads
    }
  }

  private static generateStrategyResponse() {
    const strategy = {
      id: '1',
      title: 'Multi-Channel Outreach Strategy',
      type: 'outreach' as const,
      content: 'Comprehensive approach combining email, LinkedIn, and industry events to engage high-value prospects.',
      target_customers: ['Procurement Managers', 'Supply Chain Directors'],
      success_metrics: ['Response Rate >15%', 'Meeting Bookings >5/month'],
      timeline: '3 months',
      created_at: new Date()
    }

    return {
      content: `🚀 **Outreach Strategy Generated**

**Strategy:** Multi-Channel Outreach Strategy
**Target:** Procurement Managers, Supply Chain Directors
**Timeline:** 3 months
**Success Metrics:** Response Rate >15%, Meeting Bookings >5/month

This strategy leverages your manufacturing expertise and cost advantages to engage decision-makers in target industries.`,
      components: strategy
    }
  }

  private static generateProfileUpdateResponse() {
    return {
      content: `⚙️ **Profile Update Options**

I can help you update:
• Company information and description
• Target markets and customer profiles
• Product portfolio and capabilities
• Contact information and preferences

What would you like to modify?`
    }
  }

  private static generateGeneralResponse() {
    return {
      content: `Hello! I'm your AI business development assistant. I can help you with:

• **Lead Generation** - Find and qualify new prospects
• **Strategy Development** - Create outreach and follow-up plans  
• **Business Analytics** - Track performance and identify opportunities
• **Profile Management** - Update company and customer information

What would you like to work on today?`
    }
  }
}

// Proactive reporting service
export class ProactiveReportingService {
  static async generateMorningReport(): Promise<string> {
    const metrics = dataStore.getBusinessMetrics()
    return `🌅 **Morning Business Report**

**Yesterday's Activity:**
• New leads generated: ${Math.floor(Math.random() * 5) + 1}
• Follow-ups completed: ${Math.floor(Math.random() * 8) + 3}
• Meetings scheduled: ${Math.floor(Math.random() * 3) + 1}

**Today's Focus:**
• Prioritize follow-ups with qualified leads
• Review and update customer profiles
• Prepare proposals for negotiation stage prospects

**Key Metrics:**
• Total pipeline value: $${metrics.revenue_pipeline.toLocaleString()}
• Conversion rate trend: ${metrics.conversion_rate > 15 ? '↗️ Improving' : '➡️ Stable'}

Have a productive day! 🚀`
  }

  static async generateWeeklyReport(): Promise<string> {
    const metrics = dataStore.getBusinessMetrics()
    return `📊 **Weekly Business Summary**

**This Week's Performance:**
• Total leads: ${metrics.total_leads}
• Qualified prospects: ${metrics.qualified_leads}
• Conversion rate: ${metrics.conversion_rate.toFixed(1)}%
• Revenue pipeline: $${metrics.revenue_pipeline.toLocaleString()}

**Top Achievements:**
• Generated ${Math.floor(Math.random() * 10) + 5} new qualified leads
• Completed ${Math.floor(Math.random() * 15) + 10} follow-up activities
• Scheduled ${Math.floor(Math.random() * 8) + 3} prospect meetings

**Next Week's Goals:**
• Focus on high-value prospects in manufacturing sector
• Develop personalized outreach strategies
• Strengthen relationships with existing qualified leads

Keep up the great work! 💪`
  }
}

