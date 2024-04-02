import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { AzureChat } from './chat/AzureChat'

export class AzureClient extends ClientBase {
  async initialize(apiKeyValues: ApiKeyValues) {
    const azureOpenaiApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.AZURE_OPENAI_API_KEY,
    )
    const azureOpenaiEndpoint = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.AZURE_OPENAI_ENDPOINT,
    )
    const deploymentId = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.AZURE_OPENAI_DEPLOYMENT_ID,
    )

    this.chatClient = new AzureChat(
      azureOpenaiApiKey,
      azureOpenaiEndpoint,
      deploymentId,
      apiKeyValues,
    )
  }
}
