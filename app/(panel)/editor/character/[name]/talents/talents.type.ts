import { Prisma } from '@prisma/client'

export type TalentProps = Prisma.AscensionCharacterGetPayload<{
  include: { materials: true }
}>
