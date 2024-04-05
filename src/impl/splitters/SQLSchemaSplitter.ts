import { TextSplitter } from 'langchain/text_splitter'

export class SQLSchemaSplitter extends TextSplitter {
  private readonly maxCharacters: number

  constructor(maxTokens: number = 2000) {
    super()
    this.maxCharacters = Math.ceil(maxTokens * 3.25)
  }

  async splitText(text: string): Promise<string[]> {
    const statements = text.split(';')
    const splits: string[] = []
    let currentSplit = ''
    let insideFunction = false

    for (const statement of statements) {
      const trimmedStatement = statement.trim()
      if (trimmedStatement !== '') {
        if (
          trimmedStatement.toUpperCase().startsWith('CREATE') &&
          trimmedStatement.toUpperCase().includes('FUNCTION')
        ) {
          insideFunction = true
        }

        if (insideFunction) {
          currentSplit += trimmedStatement + ';'
          if (trimmedStatement.endsWith('$$')) {
            insideFunction = false
            splits.push(currentSplit.trim())
            currentSplit = ''
          }
        } else {
          if (
            currentSplit.length + trimmedStatement.length + 1 <=
            this.maxCharacters
          ) {
            currentSplit += trimmedStatement + ';'
          } else {
            splits.push(currentSplit.trim())
            currentSplit = trimmedStatement + ';'
          }
        }
      }
    }

    if (currentSplit.trim() !== '') {
      splits.push(currentSplit.trim())
    }

    return splits
  }
}
