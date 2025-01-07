import { Prisma } from '@prisma/client'

export type ConstellationFormProps = {
  character:
    | Prisma.CharactersGetPayload<{ include: { images: true } }>
    | undefined
  itemId: string | undefined
  teamId: string | undefined
  constellation: number | undefined
}
