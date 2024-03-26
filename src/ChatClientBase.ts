import { ApiError } from '@util/api-error'
import { ApiKeyValues, ChatMessage, LLMSettings } from '@util/types'
import { StreamingTextResponse } from 'ai'

export abstract class ChatClientBase {
  abstract initialize(apiKeyValues: ApiKeyValues): Promise<void>

  abstract generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>

  abstract handleError(error: ApiError): ApiError

  protected getMaxGeneratedTokens(chatSettings: LLMSettings): number {
    if (chatSettings.maxTokens > chatSettings.model.maxTokenOutputLength)
      return chatSettings.model.maxTokenOutputLength
    return chatSettings.maxTokens ?? chatSettings.model.maxTokenOutputLength
  }
}
