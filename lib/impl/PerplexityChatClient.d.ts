import { ApiError } from '@util/api-error'
import { ApiKeyValues, ChatMessage, LLMSettings } from '@util/types'
import { StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { Stream } from 'openai/streaming'
import { ChatClientBase } from '../ChatClientBase'
export declare class PerplexityChatClient extends ChatClientBase {
  private perplexity
  initialize(apiKeyValues: ApiKeyValues): Promise<void>
  generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>>
  generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>
  handleError(error: ApiError): ApiError
}
