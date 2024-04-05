export enum ModelProvider {
  OpenAI = 'OpenAI',
  Google = 'Google',
  Anthropic = 'Anthropic',
  Mistral = 'Mistral',
  Groq = 'Groq',
  Perplexity = 'Perplexity',
  Ollama = 'Ollama',
  OpenRouter = 'OpenRouter',
  Cohere = 'Cohere',
  Azure = 'Azure',
  VoyageAI = 'VoyageAI',
}

export interface BaseModel {
  modelId: string
  modelName: string
  provider: ModelProvider
  platformLink: string
  maxContextLength: number
}

export interface ChatModel extends BaseModel {
  imageInput: boolean
  minTemperature: number
  maxTemperature: number
  maxTokenOutputLength: number
}

export interface EmbeddingModel extends BaseModel {
  dimensions: number | number[]
  maxInputs: number
  queryMode?: string
  documentMode?: string
  classificationMode?: string
  clusteringMode?: string
  truncationAvailable: boolean
  encodingFormats: string[]
}

export type EmbeddingResult = { vectors: number[][]; tokensProcessed: number }

export interface OpenRouterLLM extends ChatModel {
  maxContext: number
}

export enum validEnviromentKeys {
  OPENAI_API_KEY = 'OPENAI_API_KEY',
  ANTHROPIC_API_KEY = 'ANTHROPIC_API_KEY',
  GOOGLE_GEMINI_API_KEY = 'GOOGLE_GEMINI_API_KEY',
  MISTRAL_API_KEY = 'MISTRAL_API_KEY',
  GROQ_API_KEY = 'GROQ_API_KEY',
  PERPLEXITY_API_KEY = 'PERPLEXITY_API_KEY',
  COHERE_API_KEY = 'COHERE_API_KEY',
  AZURE_OPENAI_API_KEY = 'AZURE_OPENAI_API_KEY',
  OPENROUTER_API_KEY = 'OPENROUTER_API_KEY',
  VOYAGE_API_KEY = 'VOYAGE_API_KEY',

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
  [key in validEnviromentKeys]: string
}

export interface LLMSettings {
  model: ChatModel
  temperature: number
  maxTokens: number
}

export interface TextPart {
  text: string
  type?: 'text'
}

export interface ImagePart {
  source: ImagePartSource
  type?: 'image'
}

export interface ImagePartSource {
  data: string
  media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
  type?: 'base64'
}

export type ChatMessage =
  | SystemChatMessage
  | UserChatMessage
  | AssistantChatMessage

export interface SystemChatMessage {
  content: string
  role: ChatRoles.System
}

export interface UserChatMessage {
  content: string | Array<TextPart | ImagePart>
  role: ChatRoles.User
}

export interface AssistantChatMessage {
  content: string | Array<TextPart | ImagePart>
  role: ChatRoles.Assistant
}

export enum ChatRoles {
  User = 'user',
  System = 'system',
  Assistant = 'assistant',
}

type LangChainCodeSplitters =
  | 'cpp'
  | 'go'
  | 'java'
  | 'js'
  | 'php'
  | 'proto'
  | 'python'
  | 'rst'
  | 'ruby'
  | 'rust'
  | 'scala'
  | 'swift'
  | 'markdown'
  | 'latex'
  | 'html'
  | 'sol'

type OtherSplitter = 'text' | 'sql'

export type SplitterType = LangChainCodeSplitters | OtherSplitter
