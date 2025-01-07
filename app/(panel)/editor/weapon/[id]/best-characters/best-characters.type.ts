import { Prisma } from '@prisma/client'

export type BestCharactersProps = {
  data: Prisma.WeaponsGetPayload<{
    include: { bests_characters: true }
  }> | null
}
