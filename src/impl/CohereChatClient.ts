import { ApiError } from '@util/api-error'
import { checkAndGetEnv } from '@util/server-chat-helpers'
import {
  ApiKeyValues,
  ChatMessage,
  ChatRoles,
  LLMSettings,
  TextPart,
  VALID_ENV_KEYS,
} from '@util/types'
import { CohereStream, StreamingTextResponse } from 'ai'
import { Cohere, CohereClient } from 'cohere-ai'
import { ChatMessageRole } from 'cohere-ai/api'
import { ChatClientBase } from '../ChatClientBase'
import { Stream } from 'cohere-ai/core'

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

export class CohereChatClient extends ChatClientBase {
  private cohere: CohereClient | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    const cohere_api_key = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.COHERE_API_KEY,
    )
    this.cohere = new CohereClient({
      token: cohere_api_key,
    })
  }

  static toCohereRole(role: ChatRoles): ChatMessageRole {
    if (role === ChatRoles.User) {
      return ChatMessageRole.User
    }
    return ChatMessageRole.Chatbot
  }

  static messageConversion = (message: ChatMessage): Cohere.ChatMessage => {
    let messageContent = message.content
    if (Array.isArray(messageContent)) {
      messageContent = messageContent
        .filter((part) => part.type === 'text')
        .map((part) => (part as TextPart).text)
        .join('\n\n')
    }
    return {
      role: CohereChatClient.toCohereRole(message.role),
      message: messageContent,
    }
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<Cohere.StreamedChatResponse>> {
    if (!this.cohere) {
      throw new Error('Cohere client is not initialized')
    }

    const chatHistory = messages.map(CohereChatClient.messageConversion)

    let lastMessage = chatHistory.pop()
    while (lastMessage && !lastMessage.message) {
      lastMessage = chatHistory.pop()
    }

    return this.cohere.chatStream({
      model: chatSettings.model.modelId,
      message: lastMessage?.message || '',
      chatHistory,
      temperature: chatSettings.temperature,
      maxTokens: this.getMaxGeneratedTokens(chatSettings),
    })
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

  handleError(error: ApiError): ApiError {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Cohere API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Cohere API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
