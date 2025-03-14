import { Prisma } from '@prisma/client'

export type TierlistListProps = {
  data: Array<
    Prisma.TierListGetPayload<{
      include: { tiers: { include: { characters: true } } }
    }>
  > | null
}
