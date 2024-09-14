import { Prisma } from '@prisma/client'

export type CharacterProps = {
  data: Prisma.CharactersGetPayload<{ include: { images: true } }>
}
