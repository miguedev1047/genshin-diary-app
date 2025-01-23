import { Artifacts, Materials, Prisma, Weapons } from '@prisma/client'

type CharactersProps = Prisma.CharactersGetPayload<{
  include: { images: true }
}>[]
type MaterialProps = Materials[]
type WeaponProps = Weapons[]
type ArtifactProps = Artifacts[]

export type DataContextProps = {
  data: {
    materials: MaterialProps | null
    weapons: WeaponProps | null
    artifacts: ArtifactProps | null
    characters: CharactersProps | null
  }
}

export type DataProviderProps = {
  data: {
    materials: MaterialProps | null
    weapons: WeaponProps | null
    artifacts: ArtifactProps | null
    characters: CharactersProps | null
  }
  children: React.ReactNode
}

export type DataWrapperProps = {
  children: React.ReactNode
}
