import { ApiKeyValues, VALID_ENV_KEYS } from './types'

export function checkAndGetEnv(
  apiKeyValues: ApiKeyValues | null | undefined,
  apiKey: VALID_ENV_KEYS,
) {
  if (!apiKey || !apiKeyValues || !apiKeyValues[apiKey]) {
    throw new Error(`${apiKey} API Key not found`)
  }
  return apiKeyValues[apiKey]
}

export function getEnv(
  apiKeyValues: ApiKeyValues | null | undefined,
  apiKey: VALID_ENV_KEYS,
) {
  if (!apiKey || !apiKeyValues || !apiKeyValues[apiKey]) {
    return null
  }
  return apiKeyValues[apiKey]
}
