import { Content, GoogleGenerativeAI, Part, Role } from "@google/generative-ai";
import { ChatBase } from "@models/Base";
import { ChatMessage, ChatRoles, LLMSettings } from "@models/types";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";


export class GoogleChat extends ChatBase {
  private googleAI: GoogleGenerativeAI | undefined

  constructor(googleGeminiApiKey: string) {
    super()
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
      role: GoogleChat.toGoogleRole(message.role),
    }
  }

  async generateChatCompletion(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<ReadableStream> {
    if (!this.googleAI) {
      throw new Error('Google AI client is not initialized')
    }

    const googleModel = this.googleAI.getGenerativeModel(
      {
        model: chatSettings.model.modelId,
      },
      {
        apiVersion: 'v1beta',
      },
    )

    const googleMessages = messages.map(GoogleChat.convertMessages)

    if (googleMessages[messages.length - 1].role === 'model') messages.pop()

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

  async generateChatCompletionStream(
    chatSettings: LLMSettings,
    messages: ChatMessage[],
  ): Promise<StreamingTextResponse> {
    const chat = await this.generateChatCompletion(chatSettings, messages)
    return new StreamingTextResponse(chat)
  }

}