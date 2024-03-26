import { ApiError } from '@util/api-error'
import { checkAndGetEnv, getEnv } from '@util/server-chat-helpers'
import {
  ApiKeyValues,
  ChatMessage,
  LLMSettings,
  TextPart,
  VALID_ENV_KEYS,
} from '@util/types'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { ChatClientBase } from '../ChatClientBase'
import { Stream } from 'openai/streaming'

export class OpenAIChatClient extends ChatClientBase {
  private openai: OpenAI | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    const openAiApiKey = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.OPENAI_API_KEY,
    )
    const openAiOrganizationId = getEnv(
      apiKeyValues,
      VALID_ENV_KEYS.OPENAI_ORGANIZATION_ID,
    )
    this.openai = new OpenAI({
      apiKey: openAiApiKey,
      organization: openAiOrganizationId,
    })
  }

  static messageConversion(message: ChatMessage): ChatCompletionMessageParam {
    let messageContent = message.content
    if (messageContent instanceof Array) {
      messageContent = messageContent
        .filter((part) => part.type === 'text')
        .map((part) => (part as TextPart).text)
        .join('\n\n')
    }
    return {
      role: message.role,
      content: messageContent,
    }
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    if (!this.openai) {
      throw new Error('OpenAI client is not initialized')
    }

    return this.openai.chat.completions.create({
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
        'OpenAI API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('incorrect api key')) {
      errorMessage =
        'OpenAI API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
