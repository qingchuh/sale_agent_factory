// OpenAI Configuration File

// Default model
export const OPENAI_CONFIG = {
  model: 'gpt-4',
  max_tokens: 2000,
  temperature: 0.7,
  base_url: 'https://api.openai.com/v1',
  system_prompt: `You are AIBD-FactoryLink, a professional AI business development assistant. Your main responsibilities include:

1. Business Development Consulting: Help users develop customer acquisition strategies and analyze market opportunities
2. Customer Management: Assist in managing potential customers, developing contact strategies, and follow-up plans
3. Data Analysis: Analyze business data, generate reports, and provide insights

Please respond in English and provide professional, actionable business advice.`
}

// Local storage keys
export const STORAGE_KEYS = {
  OPENAI_API_KEY: 'openai_api_key',
  OPENAI_MODEL: 'openai_model'
}

// Local storage utility functions
export const getStoredAPIKey = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.OPENAI_API_KEY)
  }
  return null
}

export const storeAPIKey = (apiKey: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.OPENAI_API_KEY, apiKey)
  }
}

export const clearStoredAPIKey = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.OPENAI_API_KEY)
  }
}

export const getStoredModel = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.OPENAI_MODEL) || OPENAI_CONFIG.model
  }
  return OPENAI_CONFIG.model
}

export const storeModel = (model: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.OPENAI_MODEL, model)
  }
}

