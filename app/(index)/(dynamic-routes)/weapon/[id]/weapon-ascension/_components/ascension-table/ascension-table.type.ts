import { Prisma } from '@prisma/client'

export type Ascension = Prisma.WeaponAscensionsGetPayload<{
  include: { materials: true }
}>
