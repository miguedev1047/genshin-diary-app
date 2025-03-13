import { createContext, use } from 'react'
import { TiptapContextProps, TipTapProviderProps } from './tiptap-provider.type'

const TiptapContext = createContext<TiptapContextProps | null>(null)

export function useTiptap() {
    const CONTEXT = use(TiptapContext)
    if (!CONTEXT)
        throw new Error('useTiptap must be used within a TiptapProvider')
      return CONTEXT
}

export function TipTapProvider(props: TipTapProviderProps) {
  const { children, editor } = props

  return (
    <TiptapContext.Provider value={{ editor }}>
      {children}
    </TiptapContext.Provider>
  )
}
