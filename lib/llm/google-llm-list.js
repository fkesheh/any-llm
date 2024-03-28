'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.GOOGLE_LLM_LIST = void 0
var _types = require('../util/types')
const GOOGLE_PLATFORM_LINK = 'https://ai.google.dev/'

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini 1.0 Pro (UPDATED 12/22/23)
const GEMINI_1_0_PRO = {
  modelId: 'gemini-1.0-pro',
  modelName: 'Gemini 1.0 Pro',
  provider: _types.ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.9,
  maxTemperature: 0.9,
  maxTokenOutputLength: 2048,
  maxContextLength: 30720,
}

// Gemini 1.0 Pro Vision (UPDATED 12/22/23)
const GEMINI_1_0_PRO_VISION = {
  modelId: 'gemini-1.0-pro-vision',
  modelName: 'Gemini 1.0 Pro Vision',
  provider: _types.ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: true,
  minTemperature: 0.4,
  maxTemperature: 0.4,
  maxTokenOutputLength: 4096,
  maxContextLength: 12288,
}

// Gemini 1.5 Pro (UPDATED 12/22/23)
const GEMINI_1_5_PRO = {
  modelId: 'gemini-1.5-pro-latest',
  modelName: 'Gemini 1.5 Pro',
  provider: _types.ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 2.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 8192,
  maxContextLength: 1048576,
}
const GEMINI_ULTRA = {
  modelId: 'gemini-ultra',
  modelName: 'Gemini 1.0 Ultra',
  provider: _types.ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.9,
  maxTemperature: 0.9,
  maxTokenOutputLength: 2048,
  maxContextLength: 30720,
}
const GOOGLE_LLM_LIST = (exports.GOOGLE_LLM_LIST = [
  GEMINI_1_0_PRO,
  GEMINI_1_0_PRO_VISION,
  GEMINI_ULTRA,
  GEMINI_1_5_PRO,
])
