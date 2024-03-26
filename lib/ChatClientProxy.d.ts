import {
  ApiKeyValues,
  ChatMessage,
  LLMSettings,
  ModelProvider,
} from '@util/types'
import { StreamingTextResponse } from 'ai'
export declare class ChatClientProxy {
  private chatClient
  private provider
  constructor(provider: ModelProvider)
  initialize(apiKeyValues: ApiKeyValues): Promise<void>
  createChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>
  createChatCompletionNonStreaming(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<string>
  parseRequest(request: Request): Promise<{
    chatSettings: LLMSettings
    messages: ChatMessage[]
  }>
  private handleError
}
