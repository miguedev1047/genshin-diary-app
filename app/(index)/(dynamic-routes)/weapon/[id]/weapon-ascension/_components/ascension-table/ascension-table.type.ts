import { Prisma } from '@prisma/client'

export type AscensionProps = Prisma.WeaponAscensionsGetPayload<{
  include: { materials: true }
}>
