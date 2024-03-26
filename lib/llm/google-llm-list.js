'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.GOOGLE_LLM_LIST = void 0
var _types = require('../util/types')
const GOOGLE_PLATFORM_LINK = 'https://ai.google.dev/'

// Google Models (UPDATED 12/22/23) -----------------------------

// Gemini Pro (UPDATED 12/22/23)
const GEMINI_PRO = {
  modelId: 'gemini-pro',
  modelName: 'Gemini Pro',
  provider: _types.ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2048,
  maxContextLength: 30720,
}

// Gemini Pro Vision (UPDATED 12/22/23)
const GEMINI_PRO_VISION = {
  modelId: 'gemini-pro-vision',
  modelName: 'Gemini Pro Vision',
  provider: _types.ModelProvider.Google,
  platformLink: GOOGLE_PLATFORM_LINK,
  imageInput: true,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 12288,
}
const GOOGLE_LLM_LIST = (exports.GOOGLE_LLM_LIST = [
  GEMINI_PRO,
  GEMINI_PRO_VISION,
])
