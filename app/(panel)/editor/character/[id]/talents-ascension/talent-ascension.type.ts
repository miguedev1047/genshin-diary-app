import { Prisma } from '@prisma/client'

export type TalentAscensionProps = Prisma.AscensionCharacterGetPayload<{
  include: { materials: true }
}>
