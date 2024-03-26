import { LLM, ModelProvider } from '@util/types'

const GOOGLE_PLATFORM_LINK = 'https://ai.google.dev/'

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini Pro (UPDATED 12/22/23)
const GEMINI_PRO: LLM = {
  modelId: 'gemini-pro',
  modelName: 'Gemini Pro',
  provider: ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2048,
  maxContextLength: 30720,
}

// Gemini Pro Vision (UPDATED 12/22/23)
const GEMINI_PRO_VISION: LLM = {
  modelId: 'gemini-pro-vision',
  modelName: 'Gemini Pro Vision',
  provider: ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: true,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 12288,
}

export const GOOGLE_LLM_LIST: LLM[] = [GEMINI_PRO, GEMINI_PRO_VISION]
