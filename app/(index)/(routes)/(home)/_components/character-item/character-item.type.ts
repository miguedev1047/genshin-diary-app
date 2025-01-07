import { Prisma } from '@prisma/client'
export type CharacterItemProps = Prisma.CharactersGetPayload<{ include: { images: true } }>
