import { LLM, ModelProvider } from '@util/types'

const ANTHROPIC_PLATFORM_LINK =
  'https://docs.anthropic.com/claude/reference/getting-started-with-the-api'

// Anthropic Models (UPDATED 03/13/24) -----------------------------

// Claude 2 (UPDATED 12/21/23)
const CLAUDE_2: LLM = {
  modelId: 'claude-2.1',
  modelName: 'Claude 2',
  provider: ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

// Claude Instant (UPDATED 12/21/23)
const CLAUDE_INSTANT: LLM = {
  modelId: 'claude-instant-1.2',
  modelName: 'Claude Instant',
  provider: ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 100000,
}

// Claude 3 Haiku (UPDATED 03/13/24)
const CLAUDE_3_HAIKU: LLM = {
  modelId: 'claude-3-haiku-20240307',
  modelName: 'Claude 3 Haiku',
  provider: ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

// Claude 3 Sonnet (UPDATED 03/04/24)
const CLAUDE_3_SONNET: LLM = {
  modelId: 'claude-3-sonnet-20240229',
  modelName: 'Claude 3 Sonnet',
  provider: ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

// Claude 3 Opus (UPDATED 03/04/24)
const CLAUDE_3_OPUS: LLM = {
  modelId: 'claude-3-opus-20240229',
  modelName: 'Claude 3 Opus',
  provider: ModelProvider.Anthropic,
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 200000,
}

export const ANTHROPIC_LLM_LIST: LLM[] = [
  CLAUDE_INSTANT,
  CLAUDE_2,
  CLAUDE_3_HAIKU,
  CLAUDE_3_SONNET,
  CLAUDE_3_OPUS,
]
