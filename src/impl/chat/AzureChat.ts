import { ApiError } from '@models/ApiError'
import { ChatBase } from '@models/Base'
import {
  ApiKeyValues,
  ChatMessage,
  LLMSettings,
  validEnviromentKeys,
} from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { Stream } from 'openai/streaming'
import { OpenAIChat } from './OpenAIChat'

export class AzureChat extends ChatBase {
  private azureOpenai: OpenAI | undefined
  private apiKeyValues: ApiKeyValues | undefined

  constructor(
    azureOpenaiApiKey: string,
    azureOpenaiEndpoint: string,
    deploymentId: string,
    apiKeyValues: ApiKeyValues,
  ) {
    super()
    this.azureOpenai = new OpenAI({
      apiKey: azureOpenaiApiKey,
      baseURL: `${azureOpenaiEndpoint}/openai/deployments/${deploymentId}`,
      defaultQuery: { 'api-version': '2023-12-01-preview' },
      defaultHeaders: { 'api-key': azureOpenaiApiKey },
    })
    this.apiKeyValues = apiKeyValues
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
          validEnviromentKeys.AZURE_OPENAI_35_TURBO_ID,
        )
        break
      case 'gpt-4':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          validEnviromentKeys.AZURE_OPENAI_4_ID,
        )
        break
      case 'gpt-4-turbo-preview':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          validEnviromentKeys.AZURE_OPENAI_4_TURBO_ID,
        )
        break
      case 'gpt-4-vision-preview':
        deploymentId = checkAndGetEnv(
          this.apiKeyValues,
          validEnviromentKeys.AZURE_OPENAI_4_TURBO_VISION_ID,
        )
        break
      default:
        throw new ApiError('Model not found', 400)
    }

    return this.azureOpenai.chat.completions.create({
      model: deploymentId,
      messages: messages.map(OpenAIChat.messageConversion),
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
}
