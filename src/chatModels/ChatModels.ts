import { AnthropicChatModels } from './AnthropicChatModels'
import { GoogleChatModels } from './GoogleChatModels'
import { MistralChatModels } from './MistralChatModels'
import { GroqChatModels } from './GroqChatModels'
import { OpenAIChatModels } from './OpenAIChatModels'
import { PerplexityChatModels } from './PerplexityChatModels'
import { CohereChatModels } from './CohereChatModels'

interface ChatModelsInterface {
  OpenAI: typeof OpenAIChatModels
  Azure: typeof OpenAIChatModels
  Google: typeof GoogleChatModels
  Mistral: typeof MistralChatModels
  Groq: typeof GroqChatModels
  Perplexity: typeof PerplexityChatModels
  Anthropic: typeof AnthropicChatModels
  Cohere: typeof CohereChatModels
}

export const ChatModels: ChatModelsInterface = {
  OpenAI: OpenAIChatModels,
  Azure: OpenAIChatModels,
  Google: GoogleChatModels,
  Mistral: MistralChatModels,
  Groq: GroqChatModels,
  Perplexity: PerplexityChatModels,
  Anthropic: AnthropicChatModels,
  Cohere: CohereChatModels,
}
