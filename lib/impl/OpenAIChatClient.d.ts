import { ApiError } from '@util/api-error'
import { ApiKeyValues, ChatMessage, LLMSettings } from '@util/types'
import { StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { ChatClientBase } from '../ChatClientBase'
import { Stream } from 'openai/streaming'
export declare class OpenAIChatClient extends ChatClientBase {
  private openai
  initialize(apiKeyValues: ApiKeyValues): Promise<void>
  static messageConversion(message: ChatMessage): ChatCompletionMessageParam
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
