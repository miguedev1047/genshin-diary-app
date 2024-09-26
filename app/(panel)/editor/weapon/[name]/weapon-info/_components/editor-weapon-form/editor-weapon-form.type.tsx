import { Prisma } from '@prisma/client'

export type EditorWeaponFormProps = {
  data: Prisma.WeaponsGetPayload<{
    include: { ascensions: true; bests_characters: true }
  }> | null
}
