import { AnthropicChatModels } from './AnthropicChatModels'
import { GoogleChatModels } from './GoogleChatModels'
import { MistralChatModels } from './MistralChatModels'
import { GroqChatModels } from './GroqChatModels'
import { OpenAiChatModels } from './OpenAIChatModels'
import { PerplexityChatModels } from './PerplexityChatModels'
import { CohereChatModels } from './CohereChatModels'

export const ChatModels = {
  OpenAI: OpenAiChatModels,
  Azure: OpenAiChatModels,
  Google: GoogleChatModels,
  Mistral: MistralChatModels,
  Groq: GroqChatModels,
  Perplexity: PerplexityChatModels,
  Anthropic: AnthropicChatModels,
  Cohere: CohereChatModels,
}
