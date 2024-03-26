import { LLM_LIST } from '@llm/llm-list'
import { LLMID, ModelProvider } from './types'

export const getModel = (provider: ModelProvider, modelId: LLMID) => {
  const model = LLM_LIST.find(
    (model) => model.modelId === modelId && model.provider === provider,
  )
  if (!model) {
    throw new Error(`Model not found: ${modelId}`)
  }
  return model
}
