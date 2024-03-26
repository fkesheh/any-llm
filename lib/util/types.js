'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.VALID_ENV_KEYS = exports.ModelProvider = exports.ChatRoles = void 0
let ModelProvider = (exports.ModelProvider = /*#__PURE__*/ (function (
  ModelProvider,
) {
  ModelProvider['OpenAI'] = 'openai'
  ModelProvider['Google'] = 'google'
  ModelProvider['Anthropic'] = 'anthropic'
  ModelProvider['Mistral'] = 'mistral'
  ModelProvider['Groq'] = 'groq'
  ModelProvider['Perplexity'] = 'perplexity'
  ModelProvider['Ollama'] = 'ollama'
  ModelProvider['OpenRouter'] = 'openrouter'
  ModelProvider['Cohere'] = 'cohere'
  ModelProvider['Azure'] = 'azure'
  return ModelProvider
})({})) // Command R
// OpenAI Models (UPDATED 1/29/24)
// Updated GPT-3.5 Turbo
// Google Models
// Gemini Pro Vision
// Anthropic Models
// Claude 3 Opus
// Mistral Models
// Mistral Large
// Mixtral-8x7b
// Perplexity Models (UPDATED 1/31/24)
// Sonar Medium Online
let VALID_ENV_KEYS = (exports.VALID_ENV_KEYS = /*#__PURE__*/ (function (
  VALID_ENV_KEYS,
) {
  VALID_ENV_KEYS['OPENAI_API_KEY'] = 'OPENAI_API_KEY'
  VALID_ENV_KEYS['ANTHROPIC_API_KEY'] = 'ANTHROPIC_API_KEY'
  VALID_ENV_KEYS['GOOGLE_GEMINI_API_KEY'] = 'GOOGLE_GEMINI_API_KEY'
  VALID_ENV_KEYS['MISTRAL_API_KEY'] = 'MISTRAL_API_KEY'
  VALID_ENV_KEYS['GROQ_API_KEY'] = 'GROQ_API_KEY'
  VALID_ENV_KEYS['PERPLEXITY_API_KEY'] = 'PERPLEXITY_API_KEY'
  VALID_ENV_KEYS['COHERE_API_KEY'] = 'COHERE_API_KEY'
  VALID_ENV_KEYS['AZURE_OPENAI_API_KEY'] = 'AZURE_OPENAI_API_KEY'
  VALID_ENV_KEYS['OPENROUTER_API_KEY'] = 'OPENROUTER_API_KEY'
  VALID_ENV_KEYS['OPENAI_ORGANIZATION_ID'] = 'OPENAI_ORGANIZATION_ID'
  VALID_ENV_KEYS['AZURE_OPENAI_ENDPOINT'] = 'AZURE_OPENAI_ENDPOINT'
  VALID_ENV_KEYS['AZURE_OPENAI_DEPLOYMENT_ID'] = 'AZURE_OPENAI_DEPLOYMENT_ID'
  VALID_ENV_KEYS['AZURE_EMBEDDINGS_NAME'] = 'AZURE_EMBEDDINGS_NAME'
  VALID_ENV_KEYS['AZURE_OPENAI_35_TURBO_ID'] = 'AZURE_OPENAI_35_TURBO_ID'
  VALID_ENV_KEYS['AZURE_OPENAI_4_ID'] = 'AZURE_OPENAI_4_ID'
  VALID_ENV_KEYS['AZURE_OPENAI_4_TURBO_ID'] = 'AZURE_OPENAI_4_TURBO_ID'
  VALID_ENV_KEYS['AZURE_OPENAI_4_TURBO_VISION_ID'] = 'AZURE_OPENAI_VISION_ID'
  return VALID_ENV_KEYS
})({}))
let ChatRoles = (exports.ChatRoles = /*#__PURE__*/ (function (ChatRoles) {
  ChatRoles['User'] = 'user'
  ChatRoles['System'] = 'system'
  ChatRoles['Assistant'] = 'assistant'
  return ChatRoles
})({}))
