import { Content, GoogleGenerativeAI, Part, Role } from '@google/generative-ai'
import { ApiError } from '@util/api-error'
import { checkAndGetEnv } from '@util/server-chat-helpers'
import {
  ApiKeyValues,
  ChatMessage,
  ChatRoles,
  LLMSettings,
  VALID_ENV_KEYS,
} from '@util/types'
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai'
import { ChatClientBase } from '../ChatClientBase'

export class GoogleChatClient extends ChatClientBase {
  private googleAI: GoogleGenerativeAI | undefined

  async initialize(apiKeyValues: ApiKeyValues) {
    const googleGeminiApiKey = checkAndGetEnv(
      apiKeyValues,
      VALID_ENV_KEYS.GOOGLE_GEMINI_API_KEY,
    )
    this.googleAI = new GoogleGenerativeAI(googleGeminiApiKey)
  }

  static toGoogleRole(role: ChatRoles): Role {
    if (role === ChatRoles.Assistant || role === ChatRoles.System) {
      return 'model'
    }
    return role
  }

  static convertMessages(message: ChatMessage): Content {
    const parts: Part[] = []
    if (message.content instanceof Array) {
      for (const part of message.content) {
        if (part.type === 'text') {
          parts.push({
            text: part.text,
          })
        }
      }
    } else {
      parts.push({
        text: message.content,
      })
    }
    return {
      parts,
      role: GoogleChatClient.toGoogleRole(message.role),
    }
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<ReadableStream> {
    if (!this.googleAI) {
      throw new Error('Google AI client is not initialized')
    }

    const googleModel = this.googleAI.getGenerativeModel({
      model: chatSettings.model.modelId,
    })

    const googleMessages = messages.map(GoogleChatClient.convertMessages)

    if (googleMessages[messages.length - 1].role === 'model') messages.pop()

    if (chatSettings.model.modelId === 'gemini-pro') {
      const lastMessage = googleMessages.pop()
      if (!lastMessage) {
        throw new Error('No messages found')
      }

      const result = await googleModel
        .startChat({
          history: googleMessages,
          generationConfig: {
            temperature: chatSettings.temperature,
          },
        })
        .sendMessageStream(lastMessage.parts)

      return GoogleGenerativeAIStream(result)
    }
    // Todo add support for vision models

    throw new Error('Unsupported model type for Google AI')
  }

  async generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    const chat = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(chat)
  }

  handleError(error: ApiError): ApiError {
    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes('api key not found')) {
      errorMessage =
        'Google Gemini API Key not found. Please set it in your profile settings.'
    } else if (errorMessage.toLowerCase().includes('api key not valid')) {
      errorMessage =
        'Google Gemini API Key is incorrect. Please fix it in your profile settings.'
    }

    return new ApiError(errorMessage, errorCode)
  }
}
