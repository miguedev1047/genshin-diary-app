import { Prisma, Team } from '@prisma/client'

export type TeamItemProps = Prisma.TeamGetPayload<{
  include: {
    characters: true
  }
}>
