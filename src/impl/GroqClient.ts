import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { OpenAIChat } from './chat/OpenAIChat'

export class GroqClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const grogApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.GROQ_API_KEY,
    )

    this.chatClient = new OpenAIChat(
      grogApiKey,
      'https://api.groq.com/openai/v1',
    )
  }
}
