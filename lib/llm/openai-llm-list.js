'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.OPENAI_LLM_LIST = void 0
var _types = require('../util/types')
const OPENAI_PLATORM_LINK = 'https://platform.openai.com/docs/overview'

// OpenAI Models (UPDATED 1/25/24) -----------------------------

// GPT-4 Turbo (UPDATED 1/25/24)
const GPT4Turbo = {
  modelId: 'gpt-4-turbo-preview',
  modelName: 'GPT-4 Turbo',
  provider: _types.ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 128000,
}

// GPT-4 Vision (UPDATED 12/18/23)
const GPT4Vision = {
  modelId: 'gpt-4-vision-preview',
  modelName: 'GPT-4 Vision',
  provider: _types.ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 128000,
}

// GPT-4 (UPDATED 1/29/24)
const GPT4 = {
  modelId: 'gpt-4',
  modelName: 'GPT-4',
  provider: _types.ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 8192,
}

// GPT-3.5 Turbo (UPDATED 1/25/24)
const GPT3_5Turbo = {
  modelId: 'gpt-3.5-turbo',
  modelName: 'GPT-3.5 Turbo',
  provider: _types.ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 4096,
  // MAX_CONTEXT_LENGTH: 16385 (TODO: Change this back to 16385 when OpenAI bumps the model)
}
const OPENAI_LLM_LIST = (exports.OPENAI_LLM_LIST = [
  GPT3_5Turbo,
  GPT4,
  GPT4Turbo,
  GPT4Vision,
])
