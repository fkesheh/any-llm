'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.ANTHROPIC_LLM_LIST = void 0
var _types = require('../util/types')
const ANTHROPIC_PLATFORM_LINK =
  'https://docs.anthropic.com/claude/reference/getting-started-with-the-api'

// Anthropic Models (UPDATED 03/13/24) -----------------------------

// Claude 2 (UPDATED 12/21/23)
const CLAUDE_2 = {
  modelId: 'claude-2.1',
  modelName: 'Claude 2',
  provider: _types.ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

// Claude Instant (UPDATED 12/21/23)
const CLAUDE_INSTANT = {
  modelId: 'claude-instant-1.2',
  modelName: 'Claude Instant',
  provider: _types.ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 100000,
}

// Claude 3 Haiku (UPDATED 03/13/24)
const CLAUDE_3_HAIKU = {
  modelId: 'claude-3-haiku-20240307',
  modelName: 'Claude 3 Haiku',
  provider: _types.ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

// Claude 3 Sonnet (UPDATED 03/04/24)
const CLAUDE_3_SONNET = {
  modelId: 'claude-3-sonnet-20240229',
  modelName: 'Claude 3 Sonnet',
  provider: _types.ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

// Claude 3 Opus (UPDATED 03/04/24)
const CLAUDE_3_OPUS = {
  modelId: 'claude-3-opus-20240229',
  modelName: 'Claude 3 Opus',
  provider: _types.ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}
const ANTHROPIC_LLM_LIST = (exports.ANTHROPIC_LLM_LIST = [
  CLAUDE_INSTANT,
  CLAUDE_2,
  CLAUDE_3_HAIKU,
  CLAUDE_3_SONNET,
  CLAUDE_3_OPUS,
])
