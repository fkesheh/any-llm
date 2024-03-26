export type ModelProvider =
  | 'openai'
  | 'google'
  | 'anthropic'
  | 'mistral'
  | 'groq'
  | 'perplexity'
  | 'ollama'
  | 'openrouter'
  | 'cohere'
  | 'azure'

export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID
  | CohereLLMID

export type CohereLLMID =
  | 'command-light' // Command Light
  | 'command-light-nightly' // Command Light Nightly
  | 'command' // Command
  | 'command-nightly' // Command Nightly
  | 'command-r' // Command R

// OpenAI Models (UPDATED 1/29/24)
export type OpenAILLMID =
  | 'gpt-4-turbo-preview' // GPT-4 Turbo
  | 'gpt-4-vision-preview' // GPT-4 Vision
  | 'gpt-4' // GPT-4
  | 'gpt-3.5-turbo' // Updated GPT-3.5 Turbo

// Google Models
export type GoogleLLMID =
  | 'gemini-pro' // Gemini Pro
  | 'gemini-pro-vision' // Gemini Pro Vision

// Anthropic Models
export type AnthropicLLMID =
  | 'claude-2.1' // Claude 2
  | 'claude-instant-1.2' // Claude Instant
  | 'claude-3-haiku-20240307' // Claude 3 Haiku
  | 'claude-3-sonnet-20240229' // Claude 3 Sonnet
  | 'claude-3-opus-20240229' // Claude 3 Opus

// Mistral Models
export type MistralLLMID =
  | 'mistral-tiny' // Mistral Tiny
  | 'mistral-small' // Mistral Small
  | 'mistral-medium' // Mistral Medium
  | 'mistral-large-2402' // Mistral Large

export type GroqLLMID =
  | 'llama2-70b-4096' // LLaMA2-70b
  | 'mixtral-8x7b-32768' // Mixtral-8x7b

// Perplexity Models (UPDATED 1/31/24)
export type PerplexityLLMID =
  | 'pplx-7b-online' // Perplexity Online 7B
  | 'pplx-70b-online' // Perplexity Online 70B
  | 'pplx-7b-chat' // Perplexity Chat 7B
  | 'pplx-70b-chat' // Perplexity Chat 70B
  | 'mixtral-8x7b-instruct' // Mixtral 8x7B Instruct
  | 'mistral-7b-instruct' // Mistral 7B Instruct
  | 'llama-2-70b-chat' // Llama2 70B Chat
  | 'codellama-34b-instruct' // CodeLlama 34B Instruct
  | 'codellama-70b-instruct' // CodeLlama 70B Instruct
  | 'sonar-small-chat' // Sonar Small Chat
  | 'sonar-small-online' // Sonar Small Online
  | 'sonar-medium-chat' // Sonar Medium Chat
  | 'sonar-medium-online' // Sonar Medium Online

export interface LLM {
  modelId: LLMID
  modelName: string
  provider: ModelProvider
  platformLink: string
  imageInput: boolean
  minTemperature: number
  maxTemperature: number
  maxTokenOutputLength: number
  maxContextLength: number
}

export interface OpenRouterLLM extends LLM {
  maxContext: number
}

export enum VALID_ENV_KEYS {
  OPENAI_API_KEY = 'OPENAI_API_KEY',
  ANTHROPIC_API_KEY = 'ANTHROPIC_API_KEY',
  GOOGLE_GEMINI_API_KEY = 'GOOGLE_GEMINI_API_KEY',
  MISTRAL_API_KEY = 'MISTRAL_API_KEY',
  GROQ_API_KEY = 'GROQ_API_KEY',
  PERPLEXITY_API_KEY = 'PERPLEXITY_API_KEY',
  COHERE_API_KEY = 'COHERE_API_KEY',
  AZURE_OPENAI_API_KEY = 'AZURE_OPENAI_API_KEY',
  OPENROUTER_API_KEY = 'OPENROUTER_API_KEY',

  OPENAI_ORGANIZATION_ID = 'OPENAI_ORGANIZATION_ID',

  AZURE_OPENAI_ENDPOINT = 'AZURE_OPENAI_ENDPOINT',
  AZURE_OPENAI_DEPLOYMENT_ID = 'AZURE_OPENAI_DEPLOYMENT_ID',
  AZURE_EMBEDDINGS_NAME = 'AZURE_EMBEDDINGS_NAME',

  AZURE_OPENAI_35_TURBO_ID = 'AZURE_OPENAI_35_TURBO_ID',
  AZURE_OPENAI_4_ID = 'AZURE_OPENAI_4_ID',
  AZURE_OPENAI_4_TURBO_ID = 'AZURE_OPENAI_4_TURBO_ID',
  AZURE_OPENAI_4_TURBO_VISION_ID = 'AZURE_OPENAI_VISION_ID',
}

export type ApiKeyValues = {
  [key in VALID_ENV_KEYS]: string
}

export interface LLMSettings {
  model: LLM
  temperature: number
  maxTokens: number
}

export interface TextPart {
  text: string
  type?: 'text'
}

export interface ImagePart {
  source: ImagePart.Source
  type?: 'image'
}

export namespace ImagePart {
  export interface Source {
    data: string
    media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    type?: 'base64'
  }
}

export type ChatMessage =
  | SystemChatMessage
  | UserChatMessage
  | assistantChatMessage

export interface SystemChatMessage {
  content: string
  role: ChatRoles.System
}

export interface UserChatMessage {
  content: string | Array<TextPart | ImagePart>
  role: ChatRoles.User
}

export interface assistantChatMessage {
  content: string | Array<TextPart | ImagePart>
  role: ChatRoles.Assistant
}

export enum ChatRoles {
  User = 'user',
  System = 'system',
  Assistant = 'assistant',
}
