'use client'

import { Prisma } from '@prisma/client'
import { createContext, use } from 'react'

type WeaponProviderProps = {
  data: Prisma.WeaponsGetPayload<{
    include: { bests_characters: true; ascensions: true }
  }> | null
}

type WeaponProps = Prisma.WeaponsGetPayload<{
  include: { bests_characters: true; ascensions: true }
}> | null

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
  data: WeaponProps
  children: React.ReactNode
}) {
  return (
    <WeaponContext.Provider value={{ data }}>{children}</WeaponContext.Provider>
  )
}
