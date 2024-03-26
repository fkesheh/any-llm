import { LLM, ModelProvider } from '@util/types'

const GROQ_PLATFORM_LINK = 'https://groq.com/'

const LLaMA2_70B: LLM = {
  modelId: 'llama2-70b-4096',
  modelName: 'LLaMA2-70b-chat',
  provider: ModelProvider.Groq,
  platformLink: GROQ_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 4096,
}

const MIXTRAL_8X7B: LLM = {
  modelId: 'mixtral-8x7b-32768',
  modelName: 'Mixtral-8x7b-Instruct-v0.1',
  provider: ModelProvider.Groq,
  platformLink: GROQ_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 32768,
}

export const GROQ_LLM_LIST: LLM[] = [MIXTRAL_8X7B, LLaMA2_70B]
