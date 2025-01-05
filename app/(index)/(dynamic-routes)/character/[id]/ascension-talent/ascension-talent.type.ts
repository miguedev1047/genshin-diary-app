import { Prisma } from '@prisma/client'

export type AscensionTalentsProps = {
  data: Prisma.CharactersGetPayload<{
    include: { talents_ascension: { include: { materials: true } } }
  }>
}
