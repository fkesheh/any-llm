import { CohereEmbeddingModels } from './CohereModels'
import { VoyageAIEmbeddingModels } from './VoyageAIModels'
import { OpenAIEmbeddingModels } from './OpenAIModels'

export const EmbeddingModels = {
  VoyageAI: VoyageAIEmbeddingModels,
  Cohere: CohereEmbeddingModels,
  OpenAI: OpenAIEmbeddingModels,
}
