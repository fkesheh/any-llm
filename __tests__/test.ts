import { beforeEach, describe, expect, it } from '@jest/globals' // Basic Jest testing functions
import { Client } from '../src/Client'
import { ChatModels } from '../src/chatModels/ChatModels'
import { loadApiKeyValuesFromEnvironment } from '../src/util/LoadApiKeys'
import { ApiKeyValues, ChatMessage, ChatRoles } from '../src/models/types'
import { AnthropicTokenizer } from '../src/impl/tokenizer/AnthropicTokenizer'
import { Llama2Tokenizer } from '../src/impl/tokenizer/Llama2Tokenizer'
import { OpenAITokenizer } from '../src/impl/tokenizer/OpenAITokenizer'
import { TokenizerBase } from '../src/models/Base'

describe('AntropicTokenizer', () => {
  let tokenizer: TokenizerBase

  beforeEach(() => {
    tokenizer = new AnthropicTokenizer()
  })

  it('should encode text into tokens correctly', () => {
    const text = 'Hello, world!'
    const encoded = tokenizer.encode(text)
    expect(encoded).toBeInstanceOf(Array)
    expect(encoded.length).toBeGreaterThan(0)
  })

  it('should decode tokens back into text correctly', () => {
    const tokens = [10002, 16, 2253, 5]
    const decoded = tokenizer.decode(tokens)
    expect(decoded).toBe('Hello, world!')
  })

  it('should count tokens correctly', () => {
    const text = 'This is a test.'
    const tokenCount = tokenizer.countTokens(text)
    expect(tokenCount).toBeGreaterThan(0)
    expect(tokenCount).toBeLessThanOrEqual(text.length)
  })
})

describe('Llama2Tokenizer', () => {
  let tokenizer: TokenizerBase

  beforeEach(() => {
    tokenizer = new Llama2Tokenizer()
  })

  it('should encode text into tokens correctly', () => {
    const text = 'Potato potato tomato potato.'
    const encoded = tokenizer.encode(text)
    expect(encoded).toBeInstanceOf(Array)
    expect(encoded.length).toEqual(10)
  })

  it('should decode tokens back into text correctly', () => {
    const tokens = [
      6850, 17469, 28709, 2513, 1827, 6679, 1827, 2513, 1827, 28723,
    ]
    const decoded = tokenizer.decode(tokens)
    expect(decoded).toBe('Potato potato tomato potato.')
  })

  it('should count tokens correctly', () => {
    const text = 'Potato potato tomato potato.'
    const tokenCount = tokenizer.countTokens(text)
    expect(tokenCount).toEqual(10)
  })
})

describe('OpenAITokenizer', () => {
  let tokenizer: TokenizerBase

  beforeEach(() => {
    tokenizer = new OpenAITokenizer()
  })

  it('should encode text into tokens correctly', () => {
    const text = 'Potato potato tomato potato.'
    const encoded = tokenizer.encode(text)
    expect(encoded).toBeInstanceOf(Array)
    expect(encoded.length).toEqual(6)
  })

  it('should decode tokens back into text correctly', () => {
    const tokens = [45716, 4428, 39834, 42120, 39834, 13]
    const decoded = tokenizer.decode(tokens)
    expect(decoded).toBe('Potato potato tomato potato.')
  })

  it('should count tokens correctly', () => {
    const text = 'Potato potato tomato potato.'
    const tokenCount = tokenizer.countTokens(text)
    expect(tokenCount).toEqual(6)
  })
})

describe('ChatClientProxy', () => {
  let chatClientProxy: Client
  let mockApiKeyValues: ApiKeyValues
  const providers = Object.keys(ChatModels)
  const mockMessages: ChatMessage[] = [
    {
      role: ChatRoles.User,
      content: 'Hello, how are you?',
    },
  ]

  beforeEach(() => {
    mockApiKeyValues = loadApiKeyValuesFromEnvironment()
  })
  providers
    .filter((provider) => provider !== 'azure')
    .forEach((provider) => {
      describe(`${provider} provider`, () => {
        beforeEach(() => {
          chatClientProxy = new Client(provider, mockApiKeyValues)
        })

        const models = Object.keys(ChatModels[provider])

        models.forEach((model) => {
          it(`should return a StreamingTextResponse when chat client is initialized for createChatCompletion (${provider}/${model})`, async () => {
            await expect(
              chatClientProxy.createChatCompletion(
                {
                  model: ChatModels[provider][model],
                  temperature: 0.5,
                  maxTokens: 25,
                },
                mockMessages,
              ),
            ).resolves.toBeDefined()
          })

          it(`should return a string and console log the result when chat client is initialized for createChatCompletionNonStreaming (${provider}/${model})`, async () => {
            const result =
              await chatClientProxy.createChatCompletionNonStreaming(
                {
                  model: ChatModels[provider][model],
                  temperature: 0.5,
                  maxTokens: 25,
                },
                mockMessages,
              )
            console.log(`Generated result for ${provider}/${model}: ${result}`)
            expect(result).toBeDefined()
          })
        })
      })
    })

  describe('parseRequest', () => {
    it('should throw an error if required fields are missing', async () => {
      const request = new Request('http://example.com', {
        method: 'POST',
        body: JSON.stringify({}),
      })
      await expect(chatClientProxy.parseRequest(request)).rejects.toThrow(
        'Missing required fields: chatSettings or messages',
      )
    })

    it('should return chatSettings and messages if present', async () => {
      const request = new Request('http://example.com', {
        method: 'POST',
        body: JSON.stringify({
          chatSettings: {
            model: ChatModels.OpenAI.GPT3_5Turbo,
            temperature: 0.5,
            maxTokens: 25,
          },
          messages: mockMessages,
        }),
      })
      await expect(chatClientProxy.parseRequest(request)).resolves.toEqual({
        chatSettings: {
          model: ChatModels.Google.GEMINI_1_0_PRO,
          temperature: 0.5,
          maxTokens: 25,
        },
        messages: mockMessages,
      })
    })
  })
})
