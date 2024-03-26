import { LLM, ModelProvider } from '@util/types'

const MISTRAL_PLATFORM_LINK = 'https://docs.mistral.ai/'

// Mistral Models (UPDATED 12/21/23) -----------------------------

// Mistral 7B (UPDATED 12/21/23)
const MISTRAL_7B: LLM = {
  modelId: 'mistral-tiny',
  modelName: 'Mistral Tiny',
  provider: ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 8000,
}

// Mixtral (UPDATED 12/21/23)
const MIXTRAL: LLM = {
  modelId: 'mistral-small',
  modelName: 'Mistral Small',
  provider: ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 32000,
}

// Mistral Medium (UPDATED 12/21/23)
const MISTRAL_MEDIUM: LLM = {
  modelId: 'mistral-medium',
  modelName: 'Mistral Medium',
  provider: ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 32000,
}

// Mistral Large (UPDATED 03/05/24)
const MISTRAL_LARGE: LLM = {
  modelId: 'mistral-large-2402',
  modelName: 'Mistral Large',
  provider: ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 32000,
}

export const MISTRAL_LLM_LIST: LLM[] = [
  MISTRAL_7B,
  MIXTRAL,
  MISTRAL_MEDIUM,
  MISTRAL_LARGE,
]
