import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'

export type CharacterRoutesProps = {
  params: {
    name: string
    element: ElementEnum
    weapon: WeaponTypeEnum
    stars: RarityEnum
  }
}
