import { ApiError } from '@models/ApiError'
import {
  ApiKeyValues,
  ChatMessage,
  EmbeddingModel,
  EmbeddingResult,
  LLMSettings,
} from '@models/types'
import { StreamingTextResponse } from 'ai'

export abstract class TokenizerBase {
  abstract encode(text: string): number[]
  abstract decode(tokens: number[]): string
  abstract countTokens(text: string): number
}

export abstract class ChatBase {
  abstract generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse>

  protected getMaxGeneratedTokens(chatSettings: LLMSettings): number {
    if (chatSettings.maxTokens > chatSettings.model.maxTokenOutputLength)
      return chatSettings.model.maxTokenOutputLength
    return chatSettings.maxTokens ?? chatSettings.model.maxTokenOutputLength
  }
}

export abstract class EmbeddingBase {
  abstract generateEmbeddings(
    model: EmbeddingModel,
    texts: string[],
    truncation?: boolean,
    dimensions?: number,
    inputType?: 'query' | 'document',
  ): Promise<EmbeddingResult>
}

export abstract class ClientBase {
  embeddingsClient: EmbeddingBase | undefined
  chatClient: ChatBase | undefined

  abstract initialize(apiKeyValues: ApiKeyValues): Promise<void>

  handleError(error: ApiError): ApiError {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }

  chat() {
    if (!this.chatClient) {
      throw new Error('Chat client not initialized')
    }
    return this.chatClient
  }

  embeddings() {
    if (!this.embeddingsClient) {
      throw new Error('Embeddings client not initialized')
    }
    return this.embeddingsClient
  }
}
