'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.getModel = void 0
var _llmList = require('../llm/llm-list')
const getModel = (provider, modelId) => {
  const model = _llmList.LLM_LIST.find(
    (model) => model.modelId === modelId && model.provider === provider,
  )
  if (!model) {
    throw new Error(`Model not found: ${modelId}`)
  }
  return model
}
exports.getModel = getModel
