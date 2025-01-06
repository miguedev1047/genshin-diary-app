import { Prisma } from '@prisma/client'

export type TierRowProps = {
  rows: Array<Prisma.TierRowGetPayload<{ include: { characters: true } }>>
}
