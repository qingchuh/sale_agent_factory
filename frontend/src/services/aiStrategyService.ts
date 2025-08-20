// AI Strategy Generation Service

export interface CompanyProfile {
  company_name: string
  main_products: string[]
  core_advantages: string[]
  certifications: string[]
  ideal_customer_profile?: string
  target_markets?: string
  contact_person?: string
  contact_title?: string
  website_url?: string
}

export interface LeadProfile {
  id: string
  name: string
  country: string
  industry: string
  description: string
  contact: string
  title: string
  email: string
  phone?: string
  matchScore: number
  logo?: string
  icebreaker?: string
  status: 'new' | 'contacted' | 'replied' | 'qualified' | 'converted'
  lastContact?: Date
  nextAction?: string
}

export interface AIStrategy {
  customerId: string
  icebreaker: string
  valueProposition: string
  actionSteps: {
    step1: string
    step2: string
  }
  emailDraft: string
  confidence: number
  generatedAt: Date
}

export interface StrategyRequest {
  sourceProfile: CompanyProfile
  targetProfile: LeadProfile
}

// Mock real-time insights service
export const fetchRealTimeInsights = async (companyName: string, industry: string): Promise<string[]> => {
  // Simulate real-time web information retrieval
  // In actual projects, this would call real web crawler or API services
  // For example: LinkedIn API, News API, company websites, etc.
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Simulate returned real-time insights
  return [
    `${companyName} recently launched a new ${industry} product line and shared important insights about sustainable manufacturing on LinkedIn.`,
    `The CEO of ${companyName} emphasized the importance of digital transformation at a recent industry conference and expressed interest in finding reliable manufacturing partners.`
  ]
}

// Generate personalized strategy
export const generatePersonalizedStrategy = async (request: StrategyRequest): Promise<AIStrategy> => {
  const { sourceProfile, targetProfile } = request
  
  // Get real-time insights
  const insights = await fetchRealTimeInsights(targetProfile.name, targetProfile.industry)
  
  // Build value proposition
  const valueProposition = buildValueProposition(sourceProfile, targetProfile)
  
  // Generate action steps
  const actionSteps = generateActionSteps(insights)
  
  // Generate email draft
  const emailDraft = generateEmailDraft(targetProfile, insights, valueProposition)
  
  // Calculate confidence
  const confidence = calculateConfidence(targetProfile, sourceProfile)
  
  return {
    customerId: targetProfile.id,
    icebreaker: insights[0] || 'Based on industry trends and company dynamics',
    valueProposition,
    actionSteps,
    emailDraft,
    confidence,
    generatedAt: new Date()
  }
}

// Build value proposition
const buildValueProposition = (source: CompanyProfile, target: LeadProfile): string => {
  const advantages = source.core_advantages.join(', ')
  const products = source.main_products.join(', ')
  
  return `Our ${advantages} perfectly align with ${target.name}'s needs in the ${target.industry} sector. We can provide ${products} that meet their quality standards and delivery requirements.`
}

// Generate action steps
const generateActionSteps = (insights: string[]): { step1: string, step2: string } => {
  return {
    step1: `Send personalized email mentioning their recent ${insights[0]?.toLowerCase() || 'industry activities'} and how our solutions can help.`,
    step2: 'Schedule a 15-minute call to discuss their specific needs and present our capabilities.'
  }
}

// Generate email draft
const generateEmailDraft = (target: LeadProfile, insights: string[], valueProposition: string): string => {
  const insight = insights[0] || 'recent industry developments'
  
  return `Dear ${target.contact},

I hope this email finds you well. I recently came across ${target.name}'s ${insight}, and I believe we can be the perfect manufacturing partner for your needs.

${valueProposition}

Would you be interested in a brief 15-minute call to discuss how we can support your business goals?

Best regards,
[Your Name]`
}

// Calculate confidence score
const calculateConfidence = (target: LeadProfile, source: CompanyProfile): number => {
  let score = 0.5 // Base score
  
  // Industry match
  if (source.main_products.some(product => 
    target.industry.toLowerCase().includes(product.toLowerCase()) ||
    product.toLowerCase().includes(target.industry.toLowerCase())
  )) {
    score += 0.2
  }
  
  // Market match
  if (source.target_markets?.includes(target.country)) {
    score += 0.15
  }
  
  // Company size match
  if (target.matchScore >= 80) {
    score += 0.15
  }
  
  return Math.min(score, 1.0)
}

// Generate batch strategies
export const generateBatchStrategies = async (leads: LeadProfile[], companyProfile: CompanyProfile): Promise<AIStrategy[]> => {
  const strategies: AIStrategy[] = []
  
  for (const lead of leads) {
    const strategy = await generatePersonalizedStrategy({
      sourceProfile: companyProfile,
      targetProfile: lead
    })
    strategies.push(strategy)
  }
  
  return strategies
}

// Evaluate strategy quality
export const evaluateStrategyQuality = (strategy: AIStrategy): 'high' | 'medium' | 'low' => {
  if (strategy.confidence >= 0.8) return 'high'
  if (strategy.confidence >= 0.6) return 'medium'
  return 'low'
}

