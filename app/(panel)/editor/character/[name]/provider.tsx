'use client'

import { createContext, use } from 'react'
import { CharacterProps } from './_shared/types'

type CharacterProviderProps = {
  data: CharacterProps | null
}

const CharacterContext = createContext<CharacterProviderProps | null>(null)

export function useGetCharacter() {
  const CONTEXT = use(CharacterContext)
  if (!CONTEXT)
    throw new Error('useCharacter must be used within a CharacterProvider')
  return CONTEXT
}

export function CharacterProvider({
  children,
  data,
}: {
  data: CharacterProps | null
  children: React.ReactNode
}) {
  return (
    <CharacterContext.Provider value={{ data }}>
      {children}
    </CharacterContext.Provider>
  )
}
