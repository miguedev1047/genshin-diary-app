import { Prisma } from '@prisma/client'

export type AscensionsProps = {
  data: Prisma.CharactersGetPayload<{
    include: { ascensions: { include: { materials: true } } }
  }>
}
