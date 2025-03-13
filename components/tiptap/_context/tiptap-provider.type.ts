import { Editor } from '@tiptap/react'

export type TiptapContextProps = {
  editor: Editor
}

export type TipTapProviderProps = {
  editor: Editor
  children: React.ReactNode
}

