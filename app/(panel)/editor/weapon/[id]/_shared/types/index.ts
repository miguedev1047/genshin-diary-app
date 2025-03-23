import { Prisma } from '@prisma/client'

export type PageProps = {
  params: { id: string }
}

export type WeaponProps = Prisma.WeaponsGetPayload<{
  include: {
    bests_characters: true
    ascensions: { include: { materials: true } }
  }
}>
