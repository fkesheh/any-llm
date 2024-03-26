import { Content, Role } from '@google/generative-ai'
import { ApiError } from '@util/api-error'
import { ApiKeyValues, ChatMessage, ChatRoles, LLMSettings } from '@util/types'
import { StreamingTextResponse } from 'ai'
import { ChatClientBase } from '../ChatClientBase'
export declare class GoogleChatClient extends ChatClientBase {
  private googleAI
  initialize(apiKeyValues: ApiKeyValues): Promise<void>
  static toGoogleRole(role: ChatRoles): Role
  static convertMessages(message: ChatMessage): Content
  generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<ReadableStream>
  generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>
  handleError(error: ApiError): ApiError
}
