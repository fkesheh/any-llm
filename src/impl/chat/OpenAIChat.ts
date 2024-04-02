import { ChatBase } from '@models/Base'
import { ChatMessage, LLMSettings, TextPart } from '@models/types'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { Stream } from 'openai/streaming'

export class OpenAIChat extends ChatBase {
  private openai: OpenAI | undefined

  constructor(apiKey: string, baseURL?: string, organization?: string) {
    super()
    this.openai = new OpenAI({
      apiKey,
      organization,
      baseURL,
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
