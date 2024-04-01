import { ApiError } from '@models/ApiError'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import {
  ApiKeyValues,
  ChatMessage,
  LLMSettings,
  validEnviromentKeys,
} from '@models/types'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { ChatClientBase } from '@models/ChatClientBase'
import { OpenAIChatClient } from './OpenAIChatClient'
import { Stream } from 'openai/streaming'

export class MistralChatClient extends ChatClientBase {
  private mistral: OpenAI | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    const mistralApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.MISTRAL_API_KEY,
    )
    this.mistral = new OpenAI({
      apiKey: mistralApiKey,
      baseURL: 'https://api.mistral.ai/v1',
    })
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    if (!this.mistral) {
      throw new Error('Mistral client is not initialized')
    }

    return this.mistral.chat.completions.create({
      model: chatSettings.model.modelId,
      messages: messages.map(OpenAIChatClient.messageConversion),
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
        'Mistral API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Mistral API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
