import { Prisma } from '@prisma/client'

export type TeamProps = Prisma.CharactersGetPayload<{ include: { teams: true } }> | undefined
