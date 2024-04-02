import { EmbeddingModel, ModelProvider } from '@models/types'

const OPENAI_PLATORM_LINK = 'https://platform.openai.com/docs/overview'

const TEXT_EMBEDDING_ADA_002: EmbeddingModel = {
  modelId: 'text-embedding-ada-002',
  modelName: 'Text Embedding ADA v002',
  provider: ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  dimensions: 3072,
  maxInputs: 2048,
  truncationAvailable: false,
  maxContextLength: 8191,
  encodingFormats: ['float', 'base64'],
}

const TEXT_EMBEDDING_3_LARGE: EmbeddingModel = {
  modelId: 'text-embedding-3-large',
  modelName: 'Text Embedding 3 Large',
  provider: ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  dimensions: [256, 1024, 3072],
  maxInputs: 2048,
  truncationAvailable: false,
  maxContextLength: 8191,
  encodingFormats: ['float', 'base64'],
}

const TEXT_EMBEDDING_3_SMALL: EmbeddingModel = {
  modelId: 'text-embedding-3-small',
  modelName: 'Text Embedding 3 Small',
  provider: ModelProvider.OpenAI,
  platformLink: OPENAI_PLATORM_LINK,
  dimensions: [512, 1536],
  maxInputs: 2048,
  truncationAvailable: false,
  maxContextLength: 8191,
  encodingFormats: ['float', 'base64'],
}

export const OpenAIEmbeddingModels = {
  TEXT_EMBEDDING_ADA_002,
  TEXT_EMBEDDING_3_LARGE,
  TEXT_EMBEDDING_3_SMALL,
}
