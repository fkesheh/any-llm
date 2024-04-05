import { SplitterType } from '@models/types'
import fs from 'fs'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import mammoth from 'mammoth'
import { SQLSchemaSplitter } from './SQLSchemaSplitter'
import { extensionToSplitterType } from './SplitterUtils'
import html2md from "html-to-md"

export const splitString = (
  text: string,
  chunkHeader: string,
  splitterType: SplitterType,
  chunkSize: number,
  chunkOverlap: number,
) => {
  let splitter
  if (splitterType !== 'text' && splitterType !== 'sql') {
    splitter = RecursiveCharacterTextSplitter.fromLanguage(splitterType, {
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
    })
  } else if (splitterType === 'sql') {
    splitter = new SQLSchemaSplitter(chunkSize)
  } else {
    splitter = new RecursiveCharacterTextSplitter({
      chunkSize: chunkSize,
      chunkOverlap: chunkOverlap,
    })
  }
  return splitter.createDocuments([text], [], {
    chunkHeader: `${chunkHeader}\n\n---\n\n`,
    appendChunkOverlapHeader: true,
  })
}

export const splitFile = async (filePath: string) => {
  const extension = filePath.split('.').pop()

  let data
  switch (extension) {
    case 'docx':
      {
        const docx = fs.readFileSync(filePath)
        const options = {
          styleMap: ['comment-reference => sup', 'strike => del'],
        }
        const res = await mammoth.convertToHtml({
          arrayBuffer: docx.buffer,
        }, options)
        data = html2md(res.value)
      }
      break
    case 'pdf':
      {
        const pdf = fs.readFileSync(filePath)
        const loader = new PDFLoader(new Blob([pdf.buffer]))
        const docs = await loader.load()
        data = docs.map((doc) => doc.pageContent).join(' ')
      }
      break
    default:
      data = fs.readFileSync(filePath, 'utf-8')
  }

  const splitType = extension ? extensionToSplitterType(extension) : 'text'

  return splitString(data, filePath, splitType, 1000, 100)
}
