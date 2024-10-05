import { Prisma } from '@prisma/client'

export type PageProps = {
  params: { name: string }
}

export type WeaponProps = Prisma.WeaponsGetPayload<{
  include: { bests_characters: true; ascensions: true }
}>
