import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { OpenAIChat } from './chat/OpenAIChat'

export class MistralClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const mistralApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.MISTRAL_API_KEY,
    )
    this.chatClient = new OpenAIChat(mistralApiKey, 'https://api.mistral.ai/v1')
  }
}
