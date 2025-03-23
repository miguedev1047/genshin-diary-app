import { WeaponProps } from '@/app/(panel)/editor/weapon/[id]/_shared/types'

export type WeaponContextProps = {
  data: WeaponProps | null
}

export type WeaponProviderProps = {
  data: WeaponProps | null
  children: React.ReactNode
}
