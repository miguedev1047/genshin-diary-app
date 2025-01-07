import { Prisma } from '@prisma/client'

export type TeamsProps = {
  data: Prisma.CharactersGetPayload<{
    include: { teams: { include: { characters: true } } }
  }>
}
