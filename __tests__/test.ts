import { beforeEach, describe, expect, it } from '@jest/globals' // Basic Jest testing functions
import { ChatClient } from '../src/ChatClient'
import { ChatModels } from '../src/chatModels/ChatModels'
import { loadApiKeyValuesFromEnvironment } from '../src/util/LoadApiKeys'
import { ApiKeyValues, ChatMessage, ChatRoles } from '../src/models/types'

describe('ChatClientProxy', () => {
  let chatClientProxy: ChatClient
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
          chatClientProxy = new ChatClient(provider, mockApiKeyValues)
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
