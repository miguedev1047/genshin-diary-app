import { HTMLReactParserOptions } from 'html-react-parser'

export const PAGE_NAME = 'Genshin Diary'
export const PAGE_VERSION = 'v0.5.0'

export const REACT_SCAN = false
export const DEV_MODE = process.env.NODE_ENV === 'development'

export const API_PANEL_PREFIX = '/api/v0/genshin-diary/panel'
export const API_PUBLIC_PREFIX = '/api/v0/genshin-diary/public'

export const NONE = ''
export const DEFAULT_IMAGE = 'https://placehold.co/600?text=Hutao+Mains'

export const PARSE_OPTIONS: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode.type === 'text') {
      const { data } = domNode
      return <span className='!text-primary text-pretty'>{data}</span>
    }
  },
}
