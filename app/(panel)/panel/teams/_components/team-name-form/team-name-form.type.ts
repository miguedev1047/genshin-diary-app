import { Prisma } from '@prisma/client'

export type TeamNameFormProps = Prisma.TeamGetPayload<{
  include: { characters: true }
}>
