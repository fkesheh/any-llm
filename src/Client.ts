import { ApiError } from './models/ApiError'
import {
  ApiKeyValues,
  ChatMessage,
  EmbeddingModel,
  EmbeddingResult,
  LLMSettings,
  ModelProvider,
} from '@models/types'
import { StreamingTextResponse } from 'ai'
import { ClientBase } from '@models/Base'
import { AnthropicClient } from '@implementations/AnthropicClient'
import { AzureClient } from '@implementations/AzureClient'
import { CohereClient } from '@implementations/CohereClient'
import { GoogleClient } from '@implementations/GoogleClient'
import { GroqClient } from '@implementations/GroqClient'
import { MistralClient } from '@implementations/MistralClient'
import { OpenAIClient } from '@implementations/OpenAIClient'
import { OpenRouterClient } from '@implementations/OpenRouterClient'
import { PerplexityClient } from '@implementations/PerplexityClient'
import { VoyageAIClient } from '@implementations/VoyageAIClient'

export class Client {
  private client: ClientBase = {
    chat: () => {
      throw new Error('Client not initialized')
    },
    embeddings: () => {
      throw new Error('Client not initialized')
    },
    chatClient: undefined,
    embeddingsClient: undefined,
    initialize: async () => {
      throw new Error('Client not initialized')
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleError: (error: ApiError) => {
      throw new Error('Client not initialized')
    },
  }
  private provider: ModelProvider
  private apiKeyValues: ApiKeyValues

  constructor(provider: ModelProvider, apiKeyValues: ApiKeyValues) {
    this.provider = provider
    this.apiKeyValues = apiKeyValues
  }

  private initialize() {
    switch (this.provider) {
      case ModelProvider.OpenAI:
        this.client = new OpenAIClient()
        break
      case ModelProvider.Azure:
        this.client = new AzureClient()
        break
      case ModelProvider.Groq:
        this.client = new GroqClient()
        break
      case ModelProvider.Google:
        this.client = new GoogleClient()
        break
      case ModelProvider.Mistral:
        this.client = new MistralClient()
        break
      case ModelProvider.Anthropic:
        this.client = new AnthropicClient()
        break
      case ModelProvider.OpenRouter:
        this.client = new OpenRouterClient()
        break
      case ModelProvider.Perplexity:
        this.client = new PerplexityClient()
        break
      case ModelProvider.Cohere:
        this.client = new CohereClient()
        break
      case ModelProvider.VoyageAI:
        this.client = new VoyageAIClient()
        break
      default:
        throw new Error('Provider not found')
    }
    return this.client?.initialize(this.apiKeyValues)
  }

  private async checkClient() {
    if (!this.client.chatClient && !this.client.embeddingsClient) {
      await this.initialize()
    }
    if (!this.client.chatClient && !this.client.embeddingsClient) {
      throw new Error('Client failed initialization')
    }
  }

  async createChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    try {
      await this.checkClient()

      return await this.client
        .chat()
        .generateChatCompletionStream(chatSettings, messages)
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
    await this.checkClient()

    const stream = await this.client
      .chat()
      .generateChatCompletionStream(chatSettings, messages)
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
    if (this.client && 'handleError' in this.client) {
      error = this.client.handleError(error)
    }

    const errorMessage = error.message || 'An unexpected error occurred'
    const errorCode = error.status || 500

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    })
  }

  async generateEmbeddings(
    model: EmbeddingModel,
    texts: string[],
    truncation?: boolean,
    dimensions?: number,
    inputType?: 'query' | 'document',
  ): Promise<EmbeddingResult> {
    await this.checkClient()

    return await this.client
      .embeddings()
      .generateEmbeddings(model, texts, truncation, dimensions, inputType)
  }
}
