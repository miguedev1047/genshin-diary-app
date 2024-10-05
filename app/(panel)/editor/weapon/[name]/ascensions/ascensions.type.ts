import { Prisma } from '@prisma/client'

export type WeaponAscensionsProps = Prisma.WeaponAscensionsGetPayload<{
  include: { materials: true }
}>
