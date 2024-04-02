import { ClientBase } from '@models/Base'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'
import { checkAndGetEnv } from '@util/ServerChatHelpers'
import { VoyageAIEmbedding } from './embeddings/VoyageAIEmbeddings'

export class VoyageAIClient extends ClientBase {
  private voyageApiKey: string | undefined

  async initialize(apiKeyValues: ApiKeyValues): Promise<void> {
    this.voyageApiKey = checkAndGetEnv(
      apiKeyValues,
      validEnviromentKeys.VOYAGE_API_KEY,
    )
    this.embeddingsClient = new VoyageAIEmbedding(this.voyageApiKey)
  }
}
