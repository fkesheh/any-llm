'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.checkAndGetEnv = checkAndGetEnv
exports.getEnv = getEnv
function checkAndGetEnv(apiKeyValues, apiKey) {
  if (!apiKey || !apiKeyValues || !apiKeyValues[apiKey]) {
    throw new Error(`${apiKey} API Key not found`)
  }
  return apiKeyValues[apiKey]
}
function getEnv(apiKeyValues, apiKey) {
  if (!apiKey || !apiKeyValues || !apiKeyValues[apiKey]) {
    return null
  }
  return apiKeyValues[apiKey]
}
