import dotenv from 'dotenv'
import { ApiKeyValues, validEnviromentKeys } from '@models/types'

dotenv.config()

export const loadApiKeyValuesFromEnvironment = (): ApiKeyValues => {
  const loadedApiKeys: ApiKeyValues = {} as ApiKeyValues
  Object.values(validEnviromentKeys).forEach((key) => {
    const value = process.env[key]
    if (value) {
      loadedApiKeys[key as keyof ApiKeyValues] = value
    }
  })
  return loadedApiKeys
}
