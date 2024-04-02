import { ChatModel, ModelProvider } from '@models/types'

const GROQ_PLATFORM_LINK = 'https://groq.com/'

const LLaMA2_70B: ChatModel = {
  modelId: 'llama2-70b-4096',
  modelName: 'LLaMA2 70b Chat',
  provider: ModelProvider.Groq,
  platformLink: GROQ_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 4096,
}

const MIXTRAL_8X7B: ChatModel = {
  modelId: 'mixtral-8x7b-32768',
  modelName: 'Mixtral 8x7b Instruct v0.1',
  provider: ModelProvider.Groq,
  platformLink: GROQ_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 32768,
}

type GroqChatModelsType = {
  MIXTRAL_8X7B: ChatModel
  LLaMA2_70B: ChatModel
}

export const GroqChatModels: GroqChatModelsType = {
  MIXTRAL_8X7B,
  LLaMA2_70B,
}
