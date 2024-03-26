export declare enum ModelProvider {
  OpenAI = 'openai',
  Google = 'google',
  Anthropic = 'anthropic',
  Mistral = 'mistral',
  Groq = 'groq',
  Perplexity = 'perplexity',
  Ollama = 'ollama',
  OpenRouter = 'openrouter',
  Cohere = 'cohere',
  Azure = 'azure',
}
export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID
  | CohereLLMID
export type CohereLLMID =
  | 'command-light'
  | 'command-light-nightly'
  | 'command'
  | 'command-nightly'
  | 'command-r'
export type OpenAILLMID =
  | 'gpt-4-turbo-preview'
  | 'gpt-4-vision-preview'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
export type GoogleLLMID = 'gemini-pro' | 'gemini-pro-vision'
export type AnthropicLLMID =
  | 'claude-2.1'
  | 'claude-instant-1.2'
  | 'claude-3-haiku-20240307'
  | 'claude-3-sonnet-20240229'
  | 'claude-3-opus-20240229'
export type MistralLLMID =
  | 'mistral-tiny'
  | 'mistral-small'
  | 'mistral-medium'
  | 'mistral-large-2402'
export type GroqLLMID = 'llama2-70b-4096' | 'mixtral-8x7b-32768'
export type PerplexityLLMID =
  | 'pplx-7b-online'
  | 'pplx-70b-online'
  | 'pplx-7b-chat'
  | 'pplx-70b-chat'
  | 'mixtral-8x7b-instruct'
  | 'mistral-7b-instruct'
  | 'llama-2-70b-chat'
  | 'codellama-34b-instruct'
  | 'codellama-70b-instruct'
  | 'sonar-small-chat'
  | 'sonar-small-online'
  | 'sonar-medium-chat'
  | 'sonar-medium-online'
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
export declare enum VALID_ENV_KEYS {
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
export declare enum ChatRoles {
  User = 'user',
  System = 'system',
  Assistant = 'assistant',
}
