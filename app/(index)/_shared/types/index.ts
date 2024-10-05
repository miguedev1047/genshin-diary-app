import { ElementEnum, Prisma, RarityEnum, WeaponTypeEnum } from '@prisma/client'

export type PageProps = {
  searchParams: {
    name: string
    element: ElementEnum
    weapon: WeaponTypeEnum
    stars: RarityEnum
  }
}

export type CharacterProps = Prisma.CharactersGetPayload<{
  include: {
    images: true
  }
}>
