import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { GoogleChat } from './chat/GoogleChat'

export class GoogleClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const googleGeminiApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.GOOGLE_GEMINI_API_KEY,
    )
    this.chatClient = new GoogleChat(googleGeminiApiKey)
  }
}
