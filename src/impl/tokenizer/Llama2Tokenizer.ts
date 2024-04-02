import { TokenizerBase } from "@models/Base";
import { Llama2Tokenizer as LenmlLlama2Tokenizer } from '@lenml/llama2-tokenizer'
import { load_vocab } from '@lenml/llama2-tokenizer-vocab-llama2'

export class Llama2Tokenizer implements TokenizerBase {
  tokenizer = new LenmlLlama2Tokenizer()

  constructor() {    
    const vocab_model = load_vocab()
    this.tokenizer.install_vocab(vocab_model)
  }

  encode(text: string): number[] {
    return this.tokenizer.encode(text)
  }

  decode(tokens: number[]): string {
    return this.tokenizer.decode(tokens)
  }
  
  countTokens(text: string): number {
    return this.encode(text).length
  }
}
