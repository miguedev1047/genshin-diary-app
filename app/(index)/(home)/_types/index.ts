import { Prisma } from "@prisma/client"

export type PageProps = {
  searchParams: {
    name: string
    element: string
    weapon: string
    stars: string
  }
}

export type CharacterProps = Prisma.CharactersGetPayload<{
  include: {
    images: true
  }
}>