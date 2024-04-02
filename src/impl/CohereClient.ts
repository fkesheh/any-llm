import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { CohereChat } from './chat/CohereChat'

export class CohereClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const cohere_api_key = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.COHERE_API_KEY,
    )
    this.chatClient = new CohereChat(cohere_api_key)
  }
}
