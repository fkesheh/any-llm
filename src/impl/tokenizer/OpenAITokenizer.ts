import { TokenizerBase } from '@models/Base'
import { Tiktoken } from 'tiktoken'
import cl100k_base from 'tiktoken/encoders/cl100k_base.json'

export class OpenAITokenizer implements TokenizerBase {
  tokenizer = new Tiktoken(
    cl100k_base.bpe_ranks,
    cl100k_base.special_tokens,
    cl100k_base.pat_str,
  )

  encode(text: string): number[] {
    return Array.from(this.tokenizer.encode(text))
  }
  decode(tokens: number[]): string {
    return new TextDecoder().decode(
      this.tokenizer.decode(new Uint32Array(tokens)),
    )
  }
  countTokens(text: string): number {
    return this.encode(text).length
  }
}
