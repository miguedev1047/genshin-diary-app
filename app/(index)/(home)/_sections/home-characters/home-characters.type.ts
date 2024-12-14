import { Prisma } from '@prisma/client'

export type HomeCharactersProps = {
  data: Array<Prisma.CharactersGetPayload<{ include: { images: true } }>>
}
