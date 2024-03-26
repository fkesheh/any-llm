import { LLM } from '@util/types'

const OPENAI_PLATORM_LINK = 'https://platform.openai.com/docs/overview'

// OpenAI Models (UPDATED 1/25/24) -----------------------------

// GPT-4 Turbo (UPDATED 1/25/24)
const GPT4Turbo: LLM = {
  modelId: 'gpt-4-turbo-preview',
  modelName: 'GPT-4 Turbo',
  provider: 'openai',
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 128000,
}

// GPT-4 Vision (UPDATED 12/18/23)
const GPT4Vision: LLM = {
  modelId: 'gpt-4-vision-preview',
  modelName: 'GPT-4 Vision',
  provider: 'openai',
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 128000,
}

// GPT-4 (UPDATED 1/29/24)
const GPT4: LLM = {
  modelId: 'gpt-4',
  modelName: 'GPT-4',
  provider: 'openai',
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 8192,
}

// GPT-3.5 Turbo (UPDATED 1/25/24)
const GPT3_5Turbo: LLM = {
  modelId: 'gpt-3.5-turbo',
  modelName: 'GPT-3.5 Turbo',
  provider: 'openai',
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 4096,
  // MAX_CONTEXT_LENGTH: 16385 (TODO: Change this back to 16385 when OpenAI bumps the model)
}

export const OPENAI_LLM_LIST: LLM[] = [GPT3_5Turbo, GPT4, GPT4Turbo, GPT4Vision]
