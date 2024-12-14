import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'

type PageProps = {
  searchParams: {
    name: string
    element: ElementEnum
    weapon: WeaponTypeEnum
    stars: RarityEnum
  }
}
