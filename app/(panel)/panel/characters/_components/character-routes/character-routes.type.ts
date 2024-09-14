import { ElementEnum, WeaponTypeEnum } from '@prisma/client'

export type CharacterRoutesProps = {
  params: {
    name: string
    element: ElementEnum
    weapon: WeaponTypeEnum
    stars: any
  }
}
