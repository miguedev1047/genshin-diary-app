import { Prisma } from '@prisma/client'

export type ConstellationFormProps = {
  data: Prisma.CharactersGetPayload<{ include: { images: true } }> | undefined
  itemId: string | undefined
  constellation: number | undefined
}
