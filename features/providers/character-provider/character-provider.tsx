'use client'

import {
  CharacterContextProps,
  CharacterProviderProps,
} from '@/features/providers/character-provider/character-provider.type'
import { createContext, use } from 'react'

const CharacterContext = createContext<CharacterContextProps | null>(null)

export function useGetCharacter() {
  const CONTEXT = use(CharacterContext)
  if (!CONTEXT)
    throw new Error('useCharacter must be used within a CharacterProvider')
  return CONTEXT
}

export function CharacterProvider(props: CharacterProviderProps) {
  const { children, data } = props

  return (
    <CharacterContext.Provider value={{ data }}>
      {children}
    </CharacterContext.Provider>
  )
}
