"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleChatClient = void 0;
var _generativeAi = require("@google/generative-ai");
var _apiError = require("../util/api-error");
var _serverChatHelpers = require("../util/server-chat-helpers");
var _types = require("../util/types");
var _ai = require("ai");
var _ChatClientBase = require("../ChatClientBase");
class GoogleChatClient extends _ChatClientBase.ChatClientBase {
  async initialize(apiKeyValues) {
    const googleGeminiApiKey = (0, _serverChatHelpers.checkAndGetEnv)(apiKeyValues, _types.VALID_ENV_KEYS.GOOGLE_GEMINI_API_KEY);
    this.googleAI = new _generativeAi.GoogleGenerativeAI(googleGeminiApiKey);
  }
  static toGoogleRole(role) {
    if (role === _types.ChatRoles.Assistant || role === _types.ChatRoles.System) {
      return 'model';
    }
    return role;
  }
  static convertMessages(message) {
    const parts = [];
    if (message.content instanceof Array) {
      for (const part of message.content) {
        if (part.type === 'text') {
          parts.push({
            text: part.text
          });
        }
      }
    } else {
      parts.push({
        text: message.content
      });
    }
    return {
      parts,
      role: GoogleChatClient.toGoogleRole(message.role)
    };
  }
  async generateChatCompletion(chatSettings, messages) {
    if (!this.googleAI) {
      throw new Error('Google AI client is not initialized');
    }
    const googleModel = this.googleAI.getGenerativeModel({
      model: chatSettings.model.modelId
    }, {
      apiVersion: 'v1beta'
    });
    const googleMessages = messages.map(GoogleChatClient.convertMessages);
    if (googleMessages[messages.length - 1].role === 'model') messages.pop();
    const lastMessage = googleMessages.pop();
    if (!lastMessage) {
      throw new Error('No messages found');
    }
    const result = await googleModel.startChat({
      history: googleMessages,
      generationConfig: {
        temperature: chatSettings.temperature
      }
    }).sendMessageStream(lastMessage.parts);
    return (0, _ai.GoogleGenerativeAIStream)(result);
  }
  async generateChatCompletionStream(chatSettings, messages) {
    const chat = await this.generateChatCompletion(chatSettings, messages);
    return new _ai.StreamingTextResponse(chat);
  }
  handleError(error) {
    let errorMessage = error.message || 'An unexpected error occurred';
    const errorCode = error.status || 500;
    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage = 'Google Gemini API Key not found. Please set it in your profile settings.';
    } else if (errorMessage.toLowerCase().includes('api key not valid')) {
      errorMessage = 'Google Gemini API Key is incorrect. Please fix it in your profile settings.';
    }
    return new _apiError.ApiError(errorMessage, errorCode);
  }
}
exports.GoogleChatClient = GoogleChatClient;