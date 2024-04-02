import { Stream } from 'cohere-ai/core'
import { ChatBase } from '@models/Base'
import {
  ChatMessage,
  ChatRoles,
  LLMSettings,
  SystemChatMessage,
  TextPart,
} from '@models/types'
import { Cohere, CohereClient as CohereClientType } from 'cohere-ai'
import { CohereStream, StreamingTextResponse } from 'ai'
import { ChatMessageRole } from 'cohere-ai/api'

// Temporary fix for the missing StreamChunk type
interface StreamChunk {
  text?: string
  eventType:
    | 'stream-start'
    | 'search-queries-generation'
    | 'search-results'
    | 'text-generation'
    | 'citation-generation'
    | 'stream-end'
}

export class CohereChat extends ChatBase {
  private cohere: CohereClientType | undefined
  fallBackSystemMessage = 'You are a helpful assistant'

  constructor(apiKey: string) {
    super()
    this.cohere = new CohereClientType({
      token: apiKey,
    })
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<Cohere.StreamedChatResponse>> {
    if (!this.cohere) {
      throw new Error('Cohere client is not initialized')
    }
    let systemMessage = this.fallBackSystemMessage
    if (messages && messages[0].role === ChatRoles.System) {
      const firstMessage = messages.shift() as SystemChatMessage
      systemMessage = firstMessage?.content ?? this.fallBackSystemMessage
    }

    const chatHistory = messages.map(CohereChat.messageConversion)

    let lastMessage = chatHistory.pop()
    while (lastMessage && !lastMessage.message) {
      lastMessage = chatHistory.pop()
    }

    return this.cohere.chatStream({
      model: chatSettings.model.modelId,
      message: lastMessage?.message || systemMessage,
      chatHistory,
      temperature: chatSettings.temperature,
      maxTokens: this.getMaxGeneratedTokens(chatSettings),
    })
  }

  static messageConversion(message: ChatMessage): Cohere.ChatMessage {
    let messageContent = message.content
    if (Array.isArray(messageContent)) {
      messageContent = messageContent
        .filter((part) => part.type === 'text')
        .map((part) => (part as TextPart).text)
        .join('\n\n')
    }
    return {
      role:
        message.role == ChatRoles.System
          ? ChatMessageRole.System
          : message.role == ChatRoles.User
            ? ChatMessageRole.User
            : ChatMessageRole.Chatbot,
      message: messageContent,
    }
  }

  async generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(
      CohereStream(response as AsyncIterable<StreamChunk>),
    )
  }
}
