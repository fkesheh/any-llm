import { LLM, ModelProvider } from '@util/types'

const COHERE_PLATFORM_LINK = 'https://docs.cohere.com/'

// Cohere Models (UPDATED 3/1624) -----------------------------
const COMMAND_LIGHT: LLM = {
  modelId: 'command-light',
  modelName: 'Command Light',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4000,
  maxContextLength: 4000,
}

const COMMAND_LIGHT_NIGHTLY: LLM = {
  modelId: 'command-light-nightly',
  modelName: 'Command Light Nightly',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 8000,
  maxContextLength: 8000,
}

const COMMAND: LLM = {
  modelId: 'command',
  modelName: 'Command',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4000,
  maxContextLength: 4000,
}

const COMMAND_NIGHTLY: LLM = {
  modelId: 'command-nightly',
  modelName: 'Command Nightly',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 8000,
  maxContextLength: 8000,
}

const COMMAND_R: LLM = {
  modelId: 'command-r',
  modelName: 'Command-R',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4000,
  maxContextLength: 128000,
}

export const COHERE_LLM_LIST: LLM[] = [
  COMMAND_LIGHT,
  COMMAND_LIGHT_NIGHTLY,
  COMMAND,
  COMMAND_NIGHTLY,
  COMMAND_R,
]
