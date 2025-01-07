import { Prisma } from '@prisma/client'

const RE_ORDER = ['S', 'A', 'B', 'C', 'D']

export const sortedTierItems = (props: { rows: Array<Prisma.TierRowGetPayload<{ include: { characters: true } }>> }) => {
  const { rows } = props
  return rows.sort(
    (a, b) => RE_ORDER.indexOf(a.tier_rank) - RE_ORDER.indexOf(b.tier_rank)
  )
}
