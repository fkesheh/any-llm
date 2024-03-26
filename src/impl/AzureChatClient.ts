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
import { Stream } from 'openai/streaming'

export class AzureChatClient extends ChatClientBase {
  private azureOpenai: OpenAI | undefined
  private apiKeyValues: ApiKeyValues | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    this.apiKeyValues = apiKeyValues
    const azureOpenaiApiKey = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.AZURE_OPENAI_API_KEY,
    )
    const azureOpenaiEndpoint = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.AZURE_OPENAI_ENDPOINT,
    )
    const deploymentId = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.AZURE_OPENAI_DEPLOYMENT_ID,
    )

    this.azureOpenai = new OpenAI({
      apiKey: azureOpenaiApiKey,
      baseURL: `${azureOpenaiEndpoint}/openai/deployments/${deploymentId}`,
      defaultQuery: { 'api-version': '2023-12-01-preview' },
      defaultHeaders: { 'api-key': azureOpenaiApiKey },
    })
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    if (!this.azureOpenai) {
      throw new Error('Azure OpenAI client is not initialized')
    }

    let deploymentId = ''
    switch (chatSettings.model.modelId) {
      case 'gpt-3.5-turbo':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          VALID_ENV_KEYS.AZURE_OPENAI_35_TURBO_ID,
        )
        break
      case 'gpt-4':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          VALID_ENV_KEYS.AZURE_OPENAI_4_ID,
        )
        break
      case 'gpt-4-turbo-preview':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          VALID_ENV_KEYS.AZURE_OPENAI_4_TURBO_ID,
        )
        break
      case 'gpt-4-vision-preview':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          VALID_ENV_KEYS.AZURE_OPENAI_4_TURBO_VISION_ID,
        )
        break
      default:
        throw new ApiError('Model not found', 400)
    }

    return this.azureOpenai.chat.completions.create({
      model: deploymentId,
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
        'Azure OpenAI API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'Azure OpenAI API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
