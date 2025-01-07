import { Prisma } from '@prisma/client'

export type TeamItemProps = Prisma.TeamsCharacterGetPayload<{
  include: { characters: true }
}>
