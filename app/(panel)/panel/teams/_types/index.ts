import { Prisma } from '@prisma/client'

export type PageProps = {
  searchParams: {
    name: string
  }
}

export type Teams = Array<
  Prisma.TeamGetPayload<{
    include: { characters: true }
  }>
>
