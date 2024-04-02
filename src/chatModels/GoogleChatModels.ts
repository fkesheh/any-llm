import { ChatModel, ModelProvider } from '@models/types'

const GOOGLE_PLATFORM_LINK = 'https://ai.google.dev/'

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini 1.0 Pro (UPDATED 12/22/23)
const GEMINI_1_0_PRO: ChatModel = {
  modelId: 'gemini-1.0-pro',
  modelName: 'Gemini 1.0 Pro',
  provider: ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.9,
  maxTemperature: 0.9,
  maxTokenOutputLength: 2048,
  maxContextLength: 30720,
}

// Gemini 1.0 Pro Vision (UPDATED 12/22/23)
const GEMINI_1_0_PRO_VISION: ChatModel = {
  modelId: 'gemini-pro-vision',
  modelName: 'Gemini 1.0 Pro Vision',
  provider: ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: true,
  minTemperature: 0.4,
  maxTemperature: 0.4,
  maxTokenOutputLength: 4096,
  maxContextLength: 12288,
}

// Gemini 1.5 Pro (UPDATED 12/22/23)
const GEMINI_1_5_PRO: ChatModel = {
  modelId: 'gemini-1.5-pro-latest',
  modelName: 'Gemini 1.5 Pro',
  provider: ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 2.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 8192,
  maxContextLength: 1048576,
}

const GEMINI_ULTRA: ChatModel = {
  modelId: 'gemini-ultra',
  modelName: 'Gemini 1.0 Ultra',
  provider: ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.9,
  maxTemperature: 0.9,
  maxTokenOutputLength: 2048,
  maxContextLength: 30720,
}
type GoogleChatModelsType = {
  GEMINI_1_0_PRO: ChatModel
  GEMINI_1_0_PRO_VISION: ChatModel
  GEMINI_ULTRA: ChatModel
  GEMINI_1_5_PRO: ChatModel
}

export const GoogleChatModels: GoogleChatModelsType = {
  GEMINI_1_0_PRO,
  GEMINI_1_0_PRO_VISION,
  GEMINI_ULTRA,
  GEMINI_1_5_PRO,
}
