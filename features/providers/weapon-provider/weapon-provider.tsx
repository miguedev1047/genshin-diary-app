'use client'

import { createContext, use } from 'react'
import { WeaponContextProps, WeaponProviderProps } from '@/features/providers/weapon-provider/weapon-provider.type'

const WeaponContext = createContext<WeaponContextProps | null>(null)

export function useGetWeapon() {
  const CONTEXT = use(WeaponContext)
  if (!CONTEXT)
    throw new Error('useWeapon must be used within a WeaponProvider')
  return CONTEXT
}

export function WeaponProvider(props: WeaponProviderProps) {
  const { children, data } = props

  return (
    <WeaponContext.Provider value={{ data }}>{children}</WeaponContext.Provider>
  )
}
