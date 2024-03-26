'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.MISTRAL_LLM_LIST = void 0
var _types = require('../util/types')
const MISTRAL_PLATFORM_LINK = 'https://docs.mistral.ai/'

// Mistral Models (UPDATED 12/21/23) -----------------------------

// Mistral 7B (UPDATED 12/21/23)
const MISTRAL_7B = {
  modelId: 'mistral-tiny',
  modelName: 'Mistral Tiny',
  provider: _types.ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 8000,
}

// Mixtral (UPDATED 12/21/23)
const MIXTRAL = {
  modelId: 'mistral-small',
  modelName: 'Mistral Small',
  provider: _types.ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 32000,
}

// Mistral Medium (UPDATED 12/21/23)
const MISTRAL_MEDIUM = {
  modelId: 'mistral-medium',
  modelName: 'Mistral Medium',
  provider: _types.ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 32000,
}

// Mistral Large (UPDATED 03/05/24)
const MISTRAL_LARGE = {
  modelId: 'mistral-large-2402',
  modelName: 'Mistral Large',
  provider: _types.ModelProvider.Mistral,
  platformLink: MISTRAL_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 2000,
  maxContextLength: 32000,
}
const MISTRAL_LLM_LIST = (exports.MISTRAL_LLM_LIST = [
  MISTRAL_7B,
  MIXTRAL,
  MISTRAL_MEDIUM,
  MISTRAL_LARGE,
])
