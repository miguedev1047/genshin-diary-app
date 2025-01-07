import { Prisma } from '@prisma/client'

export type StatsPriorityProps = {
  data: Prisma.CharactersGetPayload<{
    include: { stats_priority: true }
  }>
}
