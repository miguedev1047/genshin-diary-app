import { Prisma } from '@prisma/client'

export type CharacterRoutesProps = {
  data: Array<Prisma.CharactersGetPayload<{ include: { images: true } }>> | null
}
