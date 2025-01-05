import { Prisma } from '@prisma/client'

export type CharacterInfoProps = {
  data: Prisma.CharactersGetPayload<{ include: { images: true } }>
}
