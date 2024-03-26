'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.AnthropicChatClient = void 0
var _sdk = _interopRequireDefault(require('@anthropic-ai/sdk'))
var _apiError = require('../util/api-error')
var _serverChatHelpers = require('../util/server-chat-helpers')
var _types = require('../util/types')
var _ai = require('ai')
var _ChatClientBase = require('../ChatClientBase')
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
const fallBackSystemMessage = 'You are a helpful assistant'
class AnthropicChatClient extends _ChatClientBase.ChatClientBase {
  async initialize(apiKeyValues) {
    const anthropic_api_key = (0, _serverChatHelpers.checkAndGetEnv)(
      apiKeyValues,
      _types.VALID_ENV_KEYS.ANTHROPIC_API_KEY,
    )
    this.anthropic = new _sdk.default({
      apiKey: anthropic_api_key,
    })
  }
  messageConversion(message) {
    return {
      role: message.role == 'system' ? 'assistant' : message.role,
      content: message.content,
    }
  }
  async generateChatCompletion(chatSettings, messages) {
    if (!this.anthropic) {
      throw new Error('Anthropic client is not initialized')
    }
    let systemMessage = fallBackSystemMessage
    if (messages && messages[0].role === _types.ChatRoles.System) {
      const firstMessage = messages.shift()
      systemMessage = firstMessage?.content ?? fallBackSystemMessage
    }
    const formattedMessages = messages.map(this.messageConversion)
    return this.anthropic.messages.create({
      model: chatSettings.model.modelId,
      messages: formattedMessages,
      temperature: chatSettings.temperature,
      system: systemMessage,
      max_tokens: this.getMaxGeneratedTokens(chatSettings),
      stream: true,
    })
  }
  async generateChatCompletionStream(chatSettings, messages) {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new _ai.StreamingTextResponse((0, _ai.AnthropicStream)(response))
  }
  handleError(error) {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500
    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Anthropic API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Anthropic API Key is incorrect. Please fix it in your profile settings.'
    }
    return new _apiError.ApiError(errorMessage, errorCode)
  }
}
exports.AnthropicChatClient = AnthropicChatClient
