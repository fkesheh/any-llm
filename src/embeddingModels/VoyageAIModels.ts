import { EmbeddingModel, ModelProvider } from '@models/types'

const VOYAGE_PLATFORM_LINK = 'https://voyage.ai/'

const VOYAGE_LARGE_2: EmbeddingModel = {
  modelId: 'voyage-large-2',
  modelName: 'Voyage Large 2',
  provider: ModelProvider.VoyageAI,
  platformLink: VOYAGE_PLATFORM_LINK,
  maxContextLength: 16000,
  dimensions: 1536,
  maxInputs: 128,
  queryMode: 'query',
  documentMode: 'document',
  truncationAvailable: true,
  encodingFormats: ['float'],
}

const VOYAGE_CODE_2: EmbeddingModel = {
  modelId: 'voyage-code-2',
  modelName: 'Voyage Code 2',
  provider: ModelProvider.VoyageAI,
  platformLink: VOYAGE_PLATFORM_LINK,
  maxContextLength: 16000,
  dimensions: 1536,
  maxInputs: 128,
  queryMode: 'query',
  documentMode: 'document',
  truncationAvailable: true,
  encodingFormats: ['float'],
}

const VOYAGE_2: EmbeddingModel = {
  modelId: 'voyage-2',
  modelName: 'Voyage 2',
  provider: ModelProvider.VoyageAI,
  platformLink: VOYAGE_PLATFORM_LINK,
  maxContextLength: 4000,
  dimensions: 1024,
  maxInputs: 128,
  queryMode: 'query',
  documentMode: 'document',
  truncationAvailable: true,
  encodingFormats: ['float'],
}

const VOYAGE_LITE_02_INSTRUCT: EmbeddingModel = {
  modelId: 'voyage-lite-02-instruct',
  modelName: 'Voyage Lite 02 Instruct',
  provider: ModelProvider.VoyageAI,
  platformLink: VOYAGE_PLATFORM_LINK,
  maxContextLength: 4000,
  dimensions: 1024,
  maxInputs: 128,
  queryMode: 'query',
  documentMode: 'document',
  truncationAvailable: true,
  encodingFormats: ['float'],
}


export const VoyageAIEmbeddingModels = {
  VOYAGE_LARGE_2,
  VOYAGE_CODE_2,
  VOYAGE_2,
  VOYAGE_LITE_02_INSTRUCT,
}