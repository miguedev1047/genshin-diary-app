'use client'

import { createContext, use } from 'react'
import { DataContextProps, DataProviderProps } from './data-provider.type'

const DataContext = createContext<DataContextProps | null>(null)

export function useGetData() {
  const CONTEXT = use(DataContext)
  if (!CONTEXT)
    throw new Error('useCharacter must be used within a CharacterProvider')
  return CONTEXT
}

export function DataProvider(props: DataProviderProps) {
  const { children, data } = props

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  )
}
