import { ChatModel, ModelProvider } from '@models/types'

const COHERE_PLATFORM_LINK = 'https://docs.cohere.com/'

// Cohere Models (UPDATED 3/1624) -----------------------------
const COMMAND_LIGHT: ChatModel = {
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

const COMMAND_LIGHT_NIGHTLY: ChatModel = {
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

const COMMAND: ChatModel = {
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

const COMMAND_NIGHTLY: ChatModel = {
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

const COMMAND_R: ChatModel = {
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

export const CohereChatModels = {
  COMMAND_LIGHT,
  COMMAND_LIGHT_NIGHTLY,
  COMMAND,
  COMMAND_NIGHTLY,
  COMMAND_R,
}
