'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.GroqChatClient = void 0
var _apiError = require('../util/api-error')
var _serverChatHelpers = require('../util/server-chat-helpers')
var _types = require('../util/types')
var _ai = require('ai')
var _openai = _interopRequireDefault(require('openai'))
var _ChatClientBase = require('../ChatClientBase')
var _OpenAIChatClient = require('./OpenAIChatClient')
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
class GroqChatClient extends _ChatClientBase.ChatClientBase {
  async initialize(apiKeyValues) {
    const grogApiKey = (0, _serverChatHelpers.checkAndGetEnv)(
      apiKeyValues,
      _types.VALID_ENV_KEYS.GROQ_API_KEY,
    )
    this.groq = new _openai.default({
      apiKey: grogApiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  }
  async generateChatCompletion(chatSettings, messages) {
    if (!this.groq) {
      throw new Error('Groq client is not initialized')
    }
    return this.groq.chat.completions.create({
      model: chatSettings.model.modelId,
      messages: messages.map(
        _OpenAIChatClient.OpenAIChatClient.messageConversion,
      ),
      temperature: chatSettings.temperature,
      max_tokens: this.getMaxGeneratedTokens(chatSettings),
      stream: true,
    })
  }
  async generateChatCompletionStream(chatSettings, messages) {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new _ai.StreamingTextResponse((0, _ai.OpenAIStream)(response))
  }
  handleError(error) {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500
    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Groq API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Groq API Key is incorrect. Please fix it in your profile settings.'
    }
    return new _apiError.ApiError(errorMessage, errorCode)
  }
}
exports.GroqChatClient = GroqChatClient
