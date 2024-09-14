import { RarityEnum, WeaponTypeEnum } from '@prisma/client'
import db from '@/lib/db'

type Props = {
  name: string
  weapon: WeaponTypeEnum
  stars: RarityEnum | any
}

export async function getWeapons(props: Props) {
  const { name, weapon, stars } = props

  try {
    if (name || weapon || stars) {
      const WEAPONS = await db.weapons.findMany({
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(weapon && { type: weapon.toUpperCase() }),
          ...(stars && { rarity: `STAR_${stars}` }),
        },
      })

      return WEAPONS
    }

    const WEAPONS = await db.weapons.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
    })

    return WEAPONS
  } catch (error) {
    return null
  }
}
