import { Prisma } from '@prisma/client'

export type TeamListProps = {
  data:
    | Array<
        Prisma.TeamGetPayload<{
          include: { characters: true }
        }>
      >
    | undefined
}
