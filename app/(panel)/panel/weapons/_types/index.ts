import { RarityEnum, WeaponTypeEnum } from '@prisma/client'

export type PageProps = {
  searchParams: {
    name: string
    weapon: WeaponTypeEnum
    stars: RarityEnum
  }
}
