import { Artifacts, Materials, Prisma, Weapons } from '@prisma/client'

type CharactersProps = Prisma.CharactersGetPayload<{
  include: { images: true }
}>[]

type TierlistsProps = Prisma.TierListGetPayload<{
  include: { tiers: { include: { characters: true } } }
}>[]

type TeamsProps = Prisma.TeamGetPayload<{ include: { characters: true } }>[]

type MaterialProps = Materials[]
type WeaponProps = Weapons[]
type ArtifactProps = Artifacts[]

type dataProps = {
  materials: MaterialProps | null
  weapons: WeaponProps | null
  artifacts: ArtifactProps | null
  characters: CharactersProps | null
  tierlists: TierlistsProps | null
  teams: TeamsProps | null
}

export type DataContextProps = {
  data: dataProps
}

export type DataProviderProps = {
  data: dataProps
  children: React.ReactNode
}

export type DataWrapperProps = {
  children: React.ReactNode
}
