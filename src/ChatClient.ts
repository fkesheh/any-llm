import { ApiError } from './models/ApiError'
import {
  ApiKeyValues,
  ChatMessage,
  LLMSettings,
  ModelProvider,
} from '@models/types'
import { StreamingTextResponse } from 'ai'
import { ChatClientBase } from '@models/ChatClientBase'
import { AnthropicChatClient } from '@implementations/AnthropicChatClient'
import { AzureChatClient } from '@implementations/AzureChatClient'
import { CohereChatClient } from '@implementations/CohereChatClient'
import { GoogleChatClient } from '@implementations/GoogleChatClient'
import { GroqChatClient } from '@implementations/GroqChatClient'
import { MistralChatClient } from '@implementations/MistralChatClient'
import { OpenAIChatClient } from '@implementations/OpenAIChatClient'
import { OpenRouterChatClient } from '@implementations/OpenRouterChatClient'
import { PerplexityChatClient } from '@implementations/PerplexityChatClient'

export class ChatClient {
  private chatClient: ChatClientBase | undefined
  private provider: ModelProvider
  private apiKeyValues: ApiKeyValues

  constructor(provider: ModelProvider, apiKeyValues: ApiKeyValues) {
    this.provider = provider
    this.apiKeyValues = apiKeyValues
  }

  private initialize() {
    switch (this.provider) {
      case ModelProvider.OpenAI:
        this.chatClient = new OpenAIChatClient()
        break
      case ModelProvider.Azure:
        this.chatClient = new AzureChatClient()
        break
      case ModelProvider.Groq:
        this.chatClient = new GroqChatClient()
        break
      case ModelProvider.Google:
        this.chatClient = new GoogleChatClient()
        break
      case ModelProvider.Mistral:
        this.chatClient = new MistralChatClient()
        break
      case ModelProvider.Anthropic:
        this.chatClient = new AnthropicChatClient()
        break
      case ModelProvider.OpenRouter:
        this.chatClient = new OpenRouterChatClient()
        break
      case ModelProvider.Perplexity:
        this.chatClient = new PerplexityChatClient()
        break
      case ModelProvider.Cohere:
        this.chatClient = new CohereChatClient()
        break
      default:
        throw new Error('Provider not found')
    }
    return this.chatClient?.initialize(this.apiKeyValues)
  }

  async createChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    if (!this.chatClient) {
      await this.initialize()
    }
    if (!this.chatClient) {
      throw new Error('Chat client not initialized')
    }

    try {
      return await this.chatClient.generateChatCompletionStream(
        chatSettings,
        messages,
      )
    } catch (error) {
      if (error instanceof ApiError) {
        return this.handleError(error)
      } else {
        return this.handleError(
          new ApiError('An unexpected error occurred', 500),
        )
      }
    }
  }

  async createChatCompletionNonStreaming(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<string> {
    if (!this.chatClient) {
      await this.initialize()
    }
    if (!this.chatClient) {
      throw new Error('Chat client not initialized')
    }

    const stream = await this.chatClient.generateChatCompletionStream(
      chatSettings,
      messages,
    )
    return stream.text()
  }

  public async parseRequest(request: Request): Promise<{
    chatSettings: LLMSettings
    messages: ChatMessage[]
  }> {
    try {
      const json = await request.json()
      // Validate that required fields are present
      if (!json.chatSettings || !json.messages) {
        throw new Error('Missing required fields: chatSettings or messages')
      }
      return {
        chatSettings: json.chatSettings,
        messages: json.messages,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to parse request body: ${error.message}`)
      } else {
        throw new Error('Failed to parse request body due to an unknown error')
      }
    }
  }
  private handleError(error: ApiError): Response {
    if (this.chatClient && 'handleError' in this.chatClient) {
      error = this.chatClient.handleError(error)
    }

    const errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    })
  }
}
