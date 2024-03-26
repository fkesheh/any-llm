import { ApiError } from '@util/api-error'
import { ApiKeyValues, ChatMessage, ChatRoles, LLMSettings } from '@util/types'
import { StreamingTextResponse } from 'ai'
import { Cohere } from 'cohere-ai'
import { ChatMessageRole } from 'cohere-ai/api'
import { ChatClientBase } from '../ChatClientBase'
import { Stream } from 'cohere-ai/core'
export declare class CohereChatClient extends ChatClientBase {
  private cohere
  initialize(apiKeyValues: ApiKeyValues): Promise<void>
  static toCohereRole(role: ChatRoles): ChatMessageRole
  static messageConversion: (message: ChatMessage) => Cohere.ChatMessage
  generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<Cohere.StreamedChatResponse>>
  generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>
  handleError(error: ApiError): ApiError
}
