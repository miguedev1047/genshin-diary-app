'use client'

import { createContext, use } from 'react'
import { CharacterProps } from '@/app/(index)/(home)/_types'

type CharacterProviderProps = {
  data: Array<CharacterProps> | null
}

const CharacterContext = createContext<CharacterProviderProps | null>(null)

export function useGetCharacters() {
  const CONTEXT = use(CharacterContext)
  if (!CONTEXT)
    throw new Error('useCharacter must be used within a CharacterProvider')
  return CONTEXT
}

export function CharacterProvider({
  children,
  data,
}: {
  data: Array<CharacterProps> | null
  children: React.ReactNode
}) {
  return (
    <CharacterContext.Provider value={{ data }}>
      {children}
    </CharacterContext.Provider>
  )
}
