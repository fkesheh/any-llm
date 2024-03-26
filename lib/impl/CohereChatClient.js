'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.CohereChatClient = void 0
var _apiError = require('../util/api-error')
var _serverChatHelpers = require('../util/server-chat-helpers')
var _types = require('../util/types')
var _ai = require('ai')
var _cohereAi = require('cohere-ai')
var _api = require('cohere-ai/api')
var _ChatClientBase = require('../ChatClientBase')
// Temporary fix for the missing StreamChunk type

class CohereChatClient extends _ChatClientBase.ChatClientBase {
  async initialize(apiKeyValues) {
    const cohere_api_key = (0, _serverChatHelpers.checkAndGetEnv)(
      apiKeyValues,
      _types.VALID_ENV_KEYS.COHERE_API_KEY,
    )
    this.cohere = new _cohereAi.CohereClient({
      token: cohere_api_key,
    })
  }
  static toCohereRole(role) {
    if (role === _types.ChatRoles.User) {
      return _api.ChatMessageRole.User
    }
    return _api.ChatMessageRole.Chatbot
  }
  static messageConversion = (message) => {
    let messageContent = message.content
    if (Array.isArray(messageContent)) {
      messageContent = messageContent
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join('\n\n')
    }
    return {
      role: CohereChatClient.toCohereRole(message.role),
      message: messageContent,
    }
  }
  async generateChatCompletion(chatSettings, messages) {
    if (!this.cohere) {
      throw new Error('Cohere client is not initialized')
    }
    const chatHistory = messages.map(CohereChatClient.messageConversion)
    let lastMessage = chatHistory.pop()
    while (lastMessage && !lastMessage.message) {
      lastMessage = chatHistory.pop()
    }
    return this.cohere.chatStream({
      model: chatSettings.model.modelId,
      message: lastMessage?.message || '',
      chatHistory,
      temperature: chatSettings.temperature,
      maxTokens: this.getMaxGeneratedTokens(chatSettings),
    })
  }
  async generateChatCompletionStream(chatSettings, messages) {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new _ai.StreamingTextResponse((0, _ai.CohereStream)(response))
  }
  handleError(error) {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500
    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Cohere API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Cohere API Key is incorrect. Please fix it in your profile settings.'
    }
    return new _apiError.ApiError(errorMessage, errorCode)
  }
}
exports.CohereChatClient = CohereChatClient
