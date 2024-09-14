import { WeaponTypeEnum } from "@prisma/client"

export type WeaponRoutesProps = {
    params: {
      name: string
      weapon: WeaponTypeEnum
      stars: any
    }
  }