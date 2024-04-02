import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { OpenAIChat } from './chat/OpenAIChat'

export class OpenRouterClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const openRouterApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.OPENROUTER_API_KEY,
    )
    this.chatClient = new OpenAIChat(
      openRouterApiKey,
      'https://openrouter.ai/api/v1',
    )
  }
}
