import { Prisma } from '@prisma/client'

export type WeaponInfoProps = {
  data: Prisma.WeaponsGetPayload<{
    include: { ascensions: true; bests_characters: true }
  }> | null
}
