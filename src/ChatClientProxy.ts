import { ApiError } from '@util/api-error'
import {
  ChatMessage,
  LLMSettings,
  ModelProvider,
  VALID_ENV_KEYS,
} from '@util/types'
import { StreamingTextResponse } from 'ai'
import { ChatClientBase } from './ChatClientBase'
import { AnthropicChatClient } from './impl/AnthropicChatClient'
import { AzureChatClient } from './impl/AzureChatClient'
import { CohereChatClient } from './impl/CohereChatClient'
import { GoogleChatClient } from './impl/GoogleChatClient'
import { GroqChatClient } from './impl/GroqChatClient'
import { MistralChatClient } from './impl/MistralChatClient'
import { OpenAIChatClient } from './impl/OpenAIChatClient'
import { OpenRouterChatClient } from './impl/OpenRouterChatClient'
import { PerplexityChatClient } from './impl/PerplexityChatClient'
import { ApiKeyValues } from '@util/types'

export class ChatClientProxy {
  private chatClient: ChatClientBase | undefined
  private provider: ModelProvider

  constructor(provider: ModelProvider) {
    this.provider = provider
  }

  initialize(apiKeyValues: ApiKeyValues) {
    switch (this.provider) {
      case 'openai':
        this.chatClient = new OpenAIChatClient()
        break
      case 'azure':
        this.chatClient = new AzureChatClient()
        break
      case 'groq':
        this.chatClient = new GroqChatClient()
        break
      case 'google':
        this.chatClient = new GoogleChatClient()
        break
      case 'mistral':
        this.chatClient = new MistralChatClient()
        break
      case 'anthropic':
        this.chatClient = new AnthropicChatClient()
        break
      case 'openrouter':
        this.chatClient = new OpenRouterChatClient()
        break
      case 'perplexity':
        this.chatClient = new PerplexityChatClient()
        break
      case 'cohere':
        this.chatClient = new CohereChatClient()
        break
      default:
        throw new Error('Provider not found')
    }
    return this.chatClient?.initialize(apiKeyValues)
  }

  async createChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    if (!this.chatClient) {
      throw new Error('Chat client not initialized')
    }

    try {
      return await this.chatClient.generateChatCompletionStream(
        chatSettings,
        messages,
      )
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  async createChatCompletionNonStreaming(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<string> {
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
    } catch (error: any) {
      // Adjusted to acknowledge the potential for any type of error
      // Handle JSON parsing errors or other errors
      throw new Error(`Failed to parse request body: ${error.message}`)
    }
  }
  private handleError(error: ApiError): Response {
    if (this.chatClient) {
      error = this.chatClient.handleError(error)
    }

    let errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    })
  }
}
