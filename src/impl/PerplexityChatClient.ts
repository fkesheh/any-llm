import { ApiError } from '@util/api-error'
import { checkAndGetEnv } from '@util/server-chat-helpers'
import {
  ApiKeyValues,
  ChatMessage,
  LLMSettings,
  VALID_ENV_KEYS,
} from '@util/types'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { ChatClientBase } from '../ChatClientBase'
import { OpenAIChatClient } from './OpenAIChatClient'

export class PerplexityChatClient extends ChatClientBase {
  private perplexity: OpenAI | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    const perplexityApiKey = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.PERPLEXITY_API_KEY,
    )
    this.perplexity = new OpenAI({
      apiKey: perplexityApiKey,
      baseURL: 'https://api.perplexity.ai/',
    })
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<any> {
    if (!this.perplexity) {
      throw new Error('Perplexity client is not initialized')
    }

    return this.perplexity.chat.completions.create({
      model: chatSettings.model.modelId,
      messages: messages.map(OpenAIChatClient.messageConversion),
      temperature: chatSettings.temperature,
      max_tokens: this.getMaxGeneratedTokens(chatSettings),
      stream: true,
    })
  }

  async generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    const response = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(OpenAIStream(response))
  }

  handleError(error: ApiError): ApiError {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Perplexity API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Perplexity API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
