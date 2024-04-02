import { ApiError } from '@models/ApiError'
import { EmbeddingBase } from '@models/Base'
import { EmbeddingModel, EmbeddingResult } from '@models/types'
import axios from 'axios'

export class VoyageAIEmbedding implements EmbeddingBase {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    if (!this.apiKey) {
      throw new Error(
        'Voyage API Key not found. Please set it in your profile settings.',
      )
    }
  }

  async generateEmbeddings(
    model: EmbeddingModel,
    texts: string[],
    truncation?: boolean,
    dimensions?: number,
    inputType?: 'query' | 'document',
  ): Promise<EmbeddingResult> {
    let inputTypeString = 'None'
    if (inputType === 'query' && model.queryMode) {
      inputTypeString = model.queryMode
    } else if (inputType === 'document' && model.documentMode) {
      inputTypeString = model.documentMode
    }

    try {
      const response = await axios.post(
        'https://api.voyageai.com/v1/embeddings',
        {
          input: texts,
          model: model.modelId,
          input_type: inputTypeString,
          truncation: truncation ?? 'None',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      )

      if (response.status === 200) {
        return {
          vectors: response.data.data.map(
            (result: { embedding: number[] }) => result.embedding,
          ),
          tokensProcessed: response.data.usage.total_tokens,
        }
      } else {
        throw new ApiError(
          `Error generating embeddings: Unexpected response status ${response.status}. The expected status is 200. Please check the Voyage service status or your request parameters.`,
          response.status,
        )
      }
    } catch (error) {
      console.error(error)
      throw new Error(
        `Error generating embeddings: An exception occurred. Details: ${error instanceof Error ? error.message : 'Unknown error'}. Check your network connection and API key.`,
      )
    }
  }
}
