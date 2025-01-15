import { Prisma } from "@prisma/client"

export type AscensionProps = Prisma.AscensionCharacterGetPayload<{
  include: { materials: true }
}>
