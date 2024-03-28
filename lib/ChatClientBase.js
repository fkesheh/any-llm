"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatClientBase = void 0;
class ChatClientBase {
  getMaxGeneratedTokens(chatSettings) {
    if (chatSettings.maxTokens > chatSettings.model.maxTokenOutputLength) return chatSettings.model.maxTokenOutputLength;
    return chatSettings.maxTokens ?? chatSettings.model.maxTokenOutputLength;
  }
}
exports.ChatClientBase = ChatClientBase;