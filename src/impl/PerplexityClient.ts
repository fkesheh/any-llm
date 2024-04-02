import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { OpenAIChat } from './chat/OpenAIChat'

export class PerplexityClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const perplexityApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.PERPLEXITY_API_KEY,
    )
    this.chatClient = new OpenAIChat(
      perplexityApiKey,
      'https://api.perplexity.ai/',
    )
  }
}
