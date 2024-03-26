'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.ChatClientProxy = void 0
var _apiError = require('./util/api-error')
var _AnthropicChatClient = require('./impl/AnthropicChatClient')
var _AzureChatClient = require('./impl/AzureChatClient')
var _CohereChatClient = require('./impl/CohereChatClient')
var _GoogleChatClient = require('./impl/GoogleChatClient')
var _GroqChatClient = require('./impl/GroqChatClient')
var _MistralChatClient = require('./impl/MistralChatClient')
var _OpenAIChatClient = require('./impl/OpenAIChatClient')
var _OpenRouterChatClient = require('./impl/OpenRouterChatClient')
var _PerplexityChatClient = require('./impl/PerplexityChatClient')
class ChatClientProxy {
  constructor(provider) {
    this.provider = provider
  }
  initialize(apiKeyValues) {
    switch (this.provider) {
      case 'openai':
        this.chatClient = new _OpenAIChatClient.OpenAIChatClient()
        break
      case 'azure':
        this.chatClient = new _AzureChatClient.AzureChatClient()
        break
      case 'groq':
        this.chatClient = new _GroqChatClient.GroqChatClient()
        break
      case 'google':
        this.chatClient = new _GoogleChatClient.GoogleChatClient()
        break
      case 'mistral':
        this.chatClient = new _MistralChatClient.MistralChatClient()
        break
      case 'anthropic':
        this.chatClient = new _AnthropicChatClient.AnthropicChatClient()
        break
      case 'openrouter':
        this.chatClient = new _OpenRouterChatClient.OpenRouterChatClient()
        break
      case 'perplexity':
        this.chatClient = new _PerplexityChatClient.PerplexityChatClient()
        break
      case 'cohere':
        this.chatClient = new _CohereChatClient.CohereChatClient()
        break
      default:
        throw new Error('Provider not found')
    }
    return this.chatClient?.initialize(apiKeyValues)
  }
  async createChatCompletion(chatSettings, messages) {
    if (!this.chatClient) {
      throw new Error('Chat client not initialized')
    }
    try {
      return await this.chatClient.generateChatCompletionStream(
        chatSettings,
        messages,
      )
    } catch (error) {
      if (error instanceof _apiError.ApiError) {
        return this.handleError(error)
      } else {
        return this.handleError(
          new _apiError.ApiError('An unexpected error occurred', 500),
        )
      }
    }
  }
  async createChatCompletionNonStreaming(chatSettings, messages) {
    if (!this.chatClient) {
      throw new Error('Chat client not initialized')
    }
    const stream = await this.chatClient.generateChatCompletionStream(
      chatSettings,
      messages,
    )
    return stream.text()
  }
  async parseRequest(request) {
    try {
      const json = await request.json()
      // Validate that required fields are present
      if (!json.chatSettings || !json.messages) {
        throw new Error('Missing required fields: chatSettings or messages')
      }
      return {
        chatSettings: json.chatSettings,
        messages: json.messages,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse request body: ${error.message}`)
      } else {
        throw new Error('Failed to parse request body due to an unknown error')
      }
    }
  }
  handleError(error) {
    if (this.chatClient && 'handleError' in this.chatClient) {
      error = this.chatClient.handleError(error)
    }
    const errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500
    return new Response(
      JSON.stringify({
        message: errorMessage,
      }),
      {
        status: errorCode,
      },
    )
  }
}
exports.ChatClientProxy = ChatClientProxy
