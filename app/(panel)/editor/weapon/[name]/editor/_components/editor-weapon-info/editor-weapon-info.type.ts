import { Prisma } from '@prisma/client'

export type EditorWeaponInfoProps = {
  data: Prisma.WeaponsGetPayload<{
    include: { ascensions: true; bests_characters: true }
  }> | null
}
