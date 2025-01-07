import { Prisma } from '@prisma/client'

export type PageProps = {
  searchParams: {
    name: string
  }
}

export type TeamProps = Array<
  Prisma.TeamGetPayload<{
    include: { characters: true }
  }>
>

export type CharacterProps = Prisma.CharactersGetPayload<{
  include: { images: true }
}>
