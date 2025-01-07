import { Prisma } from '@prisma/client'

export type WeaponsProps = {
  data: Prisma.CharactersGetPayload<{
    include: { weapons: true }
  }>
}
