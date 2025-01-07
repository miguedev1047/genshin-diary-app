import { Prisma } from '@prisma/client'

export type WeaponAscensionProps = {
  data: Prisma.WeaponsGetPayload<{
    include: { ascensions: { include: { materials: true } } }
  }>
}
