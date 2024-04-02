import { EmbeddingModel, ModelProvider } from '@models/types'

const COHERE_PLATFORM_LINK = 'https://docs.cohere.com/'

// Cohere Models (UPDATED 3/1624) -----------------------------
const EMBED_ENGLISH_V3: EmbeddingModel = {
  modelId: 'embed-english-v3.0',
  modelName: 'Embed English v3.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 512,
  dimensions: 1024,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float', 'int8', 'uint8', 'binary', 'ubinary']
}

const EMBED_ENGLISH_LIGHT_V3: EmbeddingModel = {
  modelId: 'embed-english-light-v3.0',
  modelName: 'Embed English Light v3.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 512,
  dimensions: 384,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float', 'int8', 'uint8', 'binary', 'ubinary'],
}

const EMBED_ENGLISH_V2: EmbeddingModel = {
  modelId: 'embed-english-v2.0',
  modelName: 'Embed English v2.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 512,
  dimensions: 4096,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float'],
}

const EMBED_ENGLISH_LIGHT_V2: EmbeddingModel = {
  modelId: 'embed-english-light-v2.0',
  modelName: 'Embed English Light v2.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 512,
  dimensions: 1024,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float'],
}

const EMBED_MULTILINGUAL_V3: EmbeddingModel = {
  modelId: 'embed-multilingual-v3.0',
  modelName: 'Embed Multilingual v3.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 512,
  dimensions: 1024,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float', 'int8', 'uint8', 'binary', 'ubinary'],
}

const EMBED_MULTILINGUAL_LIGHT_V3: EmbeddingModel = {
  modelId: 'embed-multilingual-light-v3.0',
  modelName: 'Embed Multilingual Light v3.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 512,
  dimensions: 384,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float', 'int8', 'uint8', 'binary', 'ubinary'],
}

const EMBED_MULTILINGUAL_V2: EmbeddingModel = {
  modelId: 'embed-multilingual-v2.0',
  modelName: 'Embed Multilingual v2.0',
  provider: ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  maxContextLength: 256,
  dimensions: 768,
  maxInputs: 96,
  truncationAvailable: true,
  encodingFormats: ['float'],
}

export const CohereEmbeddingModels = {
  EMBED_ENGLISH_V3,
  EMBED_ENGLISH_LIGHT_V3,
  EMBED_ENGLISH_V2,
  EMBED_ENGLISH_LIGHT_V2,
  EMBED_MULTILINGUAL_V3,
  EMBED_MULTILINGUAL_LIGHT_V3,
  EMBED_MULTILINGUAL_V2,
}
