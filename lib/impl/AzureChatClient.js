'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.AzureChatClient = void 0
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
class AzureChatClient extends _ChatClientBase.ChatClientBase {
  async initialize(apiKeyValues) {
    this.apiKeyValues = apiKeyValues
    const azureOpenaiApiKey = (0, _serverChatHelpers.checkAndGetEnv)(
      apiKeyValues,
      _types.VALID_ENV_KEYS.AZURE_OPENAI_API_KEY,
    )
    const azureOpenaiEndpoint = (0, _serverChatHelpers.checkAndGetEnv)(
      apiKeyValues,
      _types.VALID_ENV_KEYS.AZURE_OPENAI_ENDPOINT,
    )
    const deploymentId = (0, _serverChatHelpers.checkAndGetEnv)(
      apiKeyValues,
      _types.VALID_ENV_KEYS.AZURE_OPENAI_DEPLOYMENT_ID,
    )
    this.azureOpenai = new _openai.default({
      apiKey: azureOpenaiApiKey,
      baseURL: `${azureOpenaiEndpoint}/openai/deployments/${deploymentId}`,
      defaultQuery: {
        'api-version': '2023-12-01-preview',
      },
      defaultHeaders: {
        'api-key': azureOpenaiApiKey,
      },
    })
  }
  async generateChatCompletion(chatSettings, messages) {
    if (!this.azureOpenai) {
      throw new Error('Azure OpenAI client is not initialized')
    }
    let deploymentId = ''
    switch (chatSettings.model.modelId) {
      case 'gpt-3.5-turbo':
        deploymentId = (0, _serverChatHelpers.checkAndGetEnv)(
          this.apiKeyValues,
          _types.VALID_ENV_KEYS.AZURE_OPENAI_35_TURBO_ID,
        )
        break
      case 'gpt-4':
        deploymentId = (0, _serverChatHelpers.checkAndGetEnv)(
          this.apiKeyValues,
          _types.VALID_ENV_KEYS.AZURE_OPENAI_4_ID,
        )
        break
      case 'gpt-4-turbo-preview':
        deploymentId = (0, _serverChatHelpers.checkAndGetEnv)(
          this.apiKeyValues,
          _types.VALID_ENV_KEYS.AZURE_OPENAI_4_TURBO_ID,
        )
        break
      case 'gpt-4-vision-preview':
        deploymentId = (0, _serverChatHelpers.checkAndGetEnv)(
          this.apiKeyValues,
          _types.VALID_ENV_KEYS.AZURE_OPENAI_4_TURBO_VISION_ID,
        )
        break
      default:
        throw new _apiError.ApiError('Model not found', 400)
    }
    return this.azureOpenai.chat.completions.create({
      model: deploymentId,
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
        'Azure OpenAI API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Azure OpenAI API Key is incorrect. Please fix it in your profile settings.'
    }
    return new _apiError.ApiError(errorMessage, errorCode)
  }
}
exports.AzureChatClient = AzureChatClient
