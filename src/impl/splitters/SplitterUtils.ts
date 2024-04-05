import { SplitterType } from '@models/types'

export const extensionToSplitterType = (extension: string): SplitterType => {
  if (!extension) {
    return 'text'
  }

  const extensionLower: string = extension.toLowerCase()
  switch (extensionLower) {
    case 'c++':
    case 'cpp':
    case 'c':
      return 'cpp'
    case 'go':
      return 'go'
    case 'java':
      return 'java'
    case 'js':
    case 'javascript':
      return 'js'
    case 'php':
      return 'php'
    case 'proto':
      return 'proto'
    case 'py':
    case 'python':
      return 'python'
    case 'rst':
      return 'rst'
    case 'rb':
    case 'ruby':
      return 'ruby'
    case 'rs':
    case 'rust':
      return 'rust'
    case 'scala':
      return 'scala'
    case 'swift':
      return 'swift'
    case 'md':
    case 'markdown':
      return 'markdown'
    case 'tex':
    case 'latex':
      return 'latex'
    case 'html':
    case 'htm':
    case 'xml':
    case 'xsl':
    case 'xdt':
    case 'jpr':
    case 'jws':
    case 'iml':
    case 'xsd':
      return 'html'
    case 'text':
    case 'txt':
    case 'sh':
    case 'lst':
    case 'bat':
    case 'json':
    case 'reg':
    case 'cmd':
    case 'properties':
      return 'text'
    case 'sql':
      return 'sql'
  }
  return 'text'
}
