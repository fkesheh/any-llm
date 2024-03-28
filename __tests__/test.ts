import { beforeEach, describe, expect, it } from '@jest/globals' // Basic Jest testing functions
import { ChatClientProxy } from '../src/ChatClientProxy'
import { LLM_LIST_MAP } from '../src/llm/llm-list'
import { loadApiKeyValuesFromEnvironment } from '../src/util/load-api-keys'
import { ApiKeyValues, ChatMessage, ChatRoles } from '../src/util/types'

describe('ChatClientProxy', () => {
  let chatClientProxy: ChatClientProxy
  let mockApiKeyValues: ApiKeyValues
  const providers = Object.keys(LLM_LIST_MAP)
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
          chatClientProxy = new ChatClientProxy(provider, mockApiKeyValues)
        })     

        it('should return a StreamingTextResponse when chat client is initialized for createChatCompletion', async () => {
          await expect(
            chatClientProxy.createChatCompletion(
              {
                model: LLM_LIST_MAP[provider][0],
                temperature: 0.5,
                maxTokens: 100,
              },
              mockMessages,
            ),
          ).resolves.toBeDefined()
        })

        it('should return a string and console log the result when chat client is initialized for createChatCompletionNonStreaming', async () => {
          const result = await chatClientProxy.createChatCompletionNonStreaming(
            {
              model: LLM_LIST_MAP[provider][0],
              temperature: 0.5,
              maxTokens: 100,
            },
            mockMessages,
          )
          console.log(
            `Generated result for ${provider}/${LLM_LIST_MAP[provider][0].modelId}: ${result}`,
          )
          expect(result).toBeDefined()
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
            model: LLM_LIST_MAP['openai'][0],
            temperature: 0.5,
            maxTokens: 100,
          },
          messages: mockMessages,
        }),
      })
      await expect(chatClientProxy.parseRequest(request)).resolves.toEqual({
        chatSettings: {
          model: LLM_LIST_MAP['openai'][0],
          temperature: 0.5,
          maxTokens: 100,
        },
        messages: mockMessages,
      })
    })
  })
})
