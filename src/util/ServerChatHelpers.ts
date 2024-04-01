import { ApiKeyValues, validEnviromentKeys } from '@models/types'

export function checkAndGetEnv(
  apiKeyValues: ApiKeyValues | null | undefined,
  apiKey: validEnviromentKeys,
) {
  if (!apiKey || !apiKeyValues || !apiKeyValues[apiKey]) {
    throw new Error(`${apiKey} API Key not found`)
  }
  return apiKeyValues[apiKey]
}

export function getEnv(
  apiKeyValues: ApiKeyValues | null | undefined,
  apiKey: validEnviromentKeys,
) {
  if (!apiKey || !apiKeyValues || !apiKeyValues[apiKey]) {
    return null
  }
  return apiKeyValues[apiKey]
}
