import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv, getEnv } from '@util/ServerChatHelpers'
import { OpenAIChat } from './chat/OpenAIChat'

export class OpenAIClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const openAiApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.OPENAI_API_KEY,
    )
    const openAiOrganizationId = getEnv(
      apiKeyValues,
      validEnviromentKeys.OPENAI_ORGANIZATION_ID,
    )

    this.chatClient = new OpenAIChat(
      openAiApiKey,
      'https://api.openai.com/v1',
      openAiOrganizationId ?? undefined,
    )
  }
}
