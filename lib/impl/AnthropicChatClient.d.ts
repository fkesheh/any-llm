import Anthropic from '@anthropic-ai/sdk'
import { ApiError } from '@util/api-error'
import { ApiKeyValues, ChatMessage, LLMSettings } from '@util/types'
import { StreamingTextResponse } from 'ai'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { ChatClientBase } from '../ChatClientBase'
import { Stream } from '@anthropic-ai/sdk/streaming'
export declare class AnthropicChatClient extends ChatClientBase {
  private anthropic
  initialize(apiKeyValues: ApiKeyValues): Promise<void>
  messageConversion(message: ChatMessage): MessageParam
  generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<Anthropic.Messages.MessageStreamEvent>>
  generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>
  handleError(error: ApiError): ApiError
}
