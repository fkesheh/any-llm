import dotenv from 'dotenv'
import { ApiKeyValues, VALID_ENV_KEYS } from './types'

dotenv.config()

export const loadApiKeyValuesFromEnvironment = (): ApiKeyValues => {
  const loadedApiKeys: ApiKeyValues = {} as ApiKeyValues
  Object.values(VALID_ENV_KEYS).forEach((key) => {
    const value = process.env[key]
    if (value) {
      loadedApiKeys[key as keyof ApiKeyValues] = value
    }
  })
  return loadedApiKeys
}
