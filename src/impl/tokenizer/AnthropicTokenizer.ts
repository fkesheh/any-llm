import { TokenizerBase } from '@models/Base'
import { Tiktoken } from 'tiktoken'
import claude from './data/claude.json'

export class AnthropicTokenizer implements TokenizerBase {
  private tokenizer: Tiktoken

  constructor() {    
    this.tokenizer = new Tiktoken(
      claude.bpe_ranks,
      claude.special_tokens,
      claude.pat_str,
    )
  }
  // No changes required
  encode(text: string): number[] {
    const encoded: Uint32Array = this.tokenizer.encode(
      text.normalize('NFKC'),
      'all',
    )
    return Array.from(encoded)
  }

  decode(tokens: number[]): string {
    const decoded: Uint8Array = this.tokenizer.decode(new Uint32Array(tokens))
    return new TextDecoder().decode(decoded)
  }

  countTokens(text: string): number {
    return this.encode(text).length
  }
}
