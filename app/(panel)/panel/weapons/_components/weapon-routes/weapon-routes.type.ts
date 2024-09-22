import { RarityEnum, WeaponTypeEnum } from "@prisma/client"

export type WeaponRoutesProps = {
    params: {
      name: string
      weapon: WeaponTypeEnum
      stars: RarityEnum
    }
  }