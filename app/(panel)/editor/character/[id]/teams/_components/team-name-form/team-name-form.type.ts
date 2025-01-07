import { Prisma } from '@prisma/client'

export type TeamNameFormProps = Prisma.TeamsCharacterGetPayload<{
  include: { characters: true }
}>
