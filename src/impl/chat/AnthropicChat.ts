import Anthropic from '@anthropic-ai/sdk'
import { MessageParam } from '@anthropic-ai/sdk/resources'
import { Stream } from '@anthropic-ai/sdk/streaming'
import { ChatBase } from '@models/Base'
import {
  ChatMessage,
  ChatRoles,
  LLMSettings,
  SystemChatMessage,
} from '@models/types'
import { AnthropicStream, StreamingTextResponse } from 'ai'

export class AnthropicChat extends ChatBase {
  private anthropic: Anthropic | undefined
  fallBackSystemMessage = 'You are a helpful assistant'

  constructor(apiKey: string) {
    super()
    this.anthropic = new Anthropic({
      apiKey,
    })
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<Anthropic.Messages.MessageStreamEvent>> {
    if (!this.anthropic) {
      throw new Error('Anthropic client is not initialized')
    }
    let systemMessage = this.fallBackSystemMessage
    if (messages && messages[0].role === ChatRoles.System) {
      const firstMessage = messages.shift() as SystemChatMessage
      systemMessage = firstMessage?.content ?? this.fallBackSystemMessage
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

  messageConversion(message: ChatMessage): MessageParam {
    return {
      role: message.role == 'system' ? 'assistant' : message.role,
      content: message.content,
    }
  }

  async generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(AnthropicStream(response))
  }
}
