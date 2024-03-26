import { ApiKeyValues, VALID_ENV_KEYS } from './types'
export declare function checkAndGetEnv(
  apiKeyValues: ApiKeyValues | null | undefined,
  apiKey: VALID_ENV_KEYS,
): string
export declare function getEnv(
  apiKeyValues: ApiKeyValues | null | undefined,
  apiKey: VALID_ENV_KEYS,
): string | null
