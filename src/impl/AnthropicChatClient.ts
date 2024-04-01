import Anthropic from '@anthropic-ai/sdk'
import { ApiError } from '@models/ApiError'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import {
  ApiKeyValues,
  ChatMessage,
  ChatRoles,
  LLMSettings,
  SystemChatMessage,
  validEnviromentKeys,
} from '@models/types'
import { AnthropicStream, StreamingTextResponse } from 'ai'

import { MessageParam } from '@anthropic-ai/sdk/resources'
import { ChatClientBase } from '@models/ChatClientBase'
import { Stream } from '@anthropic-ai/sdk/streaming'

const fallBackSystemMessage = 'You are a helpful assistant'

export class AnthropicChatClient extends ChatClientBase {
  private anthropic: Anthropic | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    const anthropic_api_key = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.ANTHROPIC_API_KEY,
    )
    this.anthropic = new Anthropic({
      apiKey: anthropic_api_key,
    })
  }

  messageConversion(message: ChatMessage): MessageParam {
    return {
      role: message.role == 'system' ? 'assistant' : message.role,
      content: message.content,
    }
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<Anthropic.Messages.MessageStreamEvent>> {
    if (!this.anthropic) {
      throw new Error('Anthropic client is not initialized')
    }
    let systemMessage = fallBackSystemMessage
    if (messages && messages[0].role === ChatRoles.System) {
      const firstMessage = messages.shift() as SystemChatMessage
      systemMessage = firstMessage?.content ?? fallBackSystemMessage
    }

    const formattedMessages = messages.map(this.messageConversion)

    return this.anthropic.messages.create({
      model: chatSettings.model.modelId,
      messages: formattedMessages,
      temperature: chatSettings.temperature,
      system: systemMessage,
      max_tokens: this.getMaxGeneratedTokens(chatSettings),
      stream: true,
    })
  }

  async generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(AnthropicStream(response))
  }

  handleError(error: ApiError): ApiError {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Anthropic API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Anthropic API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
