import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'

import { ClientBase } from '@models/Base'
import { AnthropicChat } from './chat/AnthropicChat'

export class AnthropicClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const anthropic_api_key = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.ANTHROPIC_API_KEY,
    )
    this.chatClient = new AnthropicChat(anthropic_api_key)
  }
}
