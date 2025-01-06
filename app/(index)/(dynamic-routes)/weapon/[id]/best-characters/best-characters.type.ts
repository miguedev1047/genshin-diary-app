import { Prisma } from '@prisma/client'

export type BestCharacterProps = {
  data: Prisma.WeaponsGetPayload<{ include: { bests_characters: true } }>
}
