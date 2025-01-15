import { Prisma } from "@prisma/client"

export type AscensionTalentProps = Prisma.TalentsAscensionCharacterGetPayload<{
  include: { materials: true }
}>