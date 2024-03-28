"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenAIChatClient = void 0;
var _apiError = require("../util/api-error");
var _serverChatHelpers = require("../util/server-chat-helpers");
var _types = require("../util/types");
var _ai = require("ai");
var _openai = _interopRequireDefault(require("openai"));
var _ChatClientBase = require("../ChatClientBase");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class OpenAIChatClient extends _ChatClientBase.ChatClientBase {
  async initialize(apiKeyValues) {
    const openAiApiKey = (0, _serverChatHelpers.checkAndGetEnv)(apiKeyValues, _types.VALID_ENV_KEYS.OPENAI_API_KEY);
    const openAiOrganizationId = (0, _serverChatHelpers.getEnv)(apiKeyValues, _types.VALID_ENV_KEYS.OPENAI_ORGANIZATION_ID);
    this.openai = new _openai.default({
      apiKey: openAiApiKey,
      organization: openAiOrganizationId
    });
  }
  static messageConversion(message) {
    let messageContent = message.content;
    if (messageContent instanceof Array) {
      messageContent = messageContent.filter(part => part.type === 'text').map(part => part.text).join('\n\n');
    }
    return {
      role: message.role,
      content: messageContent
    };
  }
  async generateChatCompletion(chatSettings, messages) {
    if (!this.openai) {
      throw new Error('OpenAI client is not initialized');
    }
    return this.openai.chat.completions.create({
      model: chatSettings.model.modelId,
      messages: messages.map(OpenAIChatClient.messageConversion),
      temperature: chatSettings.temperature,
      max_tokens: this.getMaxGeneratedTokens(chatSettings),
      stream: true
    });
  }
  async generateChatCompletionStream(chatSettings, messages) {
    const response = await this.generateChatCompletion(chatSettings, messages);
    return new _ai.StreamingTextResponse((0, _ai.OpenAIStream)(response));
  }
  handleError(error) {
    let errorMessage = error.message || 'An unexpected error occurred';
    const errorCode = error.status || 500;
    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage = 'OpenAI API Key not found. Please set it in your profile settings.';
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage = 'OpenAI API Key is incorrect. Please fix it in your profile settings.';
    }
    return new _apiError.ApiError(errorMessage, errorCode);
  }
}
exports.OpenAIChatClient = OpenAIChatClient;