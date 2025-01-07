'use client'

import { createContext, use } from 'react'
import { WeaponProps } from '@/app/(panel)/editor/weapon/[id]/_shared/types'

type WeaponProviderProps = {
  data: WeaponProps | null
}

const WeaponContext = createContext<WeaponProviderProps | null>(null)

export function useGetWeapon() {
  const CONTEXT = use(WeaponContext)
  if (!CONTEXT)
    throw new Error('useWeapon must be used within a WeaponProvider')
  return CONTEXT
}

export function WeaponProvider({
  children,
  data,
}: {
  data: WeaponProps | null
  children: React.ReactNode
}) {
  return (
    <WeaponContext.Provider value={{ data }}>{children}</WeaponContext.Provider>
  )
}
