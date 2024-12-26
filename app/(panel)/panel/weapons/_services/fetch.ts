import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

type Props = {
  name: string
  weapon: string
  stars: string
}

export async function getWeapons(props: Props) {
  const { name, weapon, stars } = props

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    if (name || weapon || stars) {
      const WEAPONS = await db.weapons.findMany({
        orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
      })

      const FILTERED_WEAPONS = WEAPONS.filter(
        (w) =>
          w.name.toLowerCase().includes(name.toLowerCase()) ||
          w.type.toLowerCase().includes(weapon.toLowerCase()) ||
          w.rarity.toLowerCase().includes(stars.toLowerCase())
      )

      return FILTERED_WEAPONS
    }

    const WEAPONS = await db.weapons.findMany({
      orderBy: [{ rarity: 'asc' }, { name: 'asc' }, { date_created: 'desc' }],
    })

    return WEAPONS
  } catch (error) {
    return null
  }
}
