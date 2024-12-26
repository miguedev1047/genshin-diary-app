import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function fetchWeapon(name: string) {
  const WEAPON_NAME = name.toLowerCase()

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const CHARACTER = await db.weapons.findFirst({
      where: { name: { contains: WEAPON_NAME } },
      include: {
        ascensions: {
          orderBy: [{ order: 'asc' }],
          include: { materials: { orderBy: [{ date_created: 'asc' }] } },
        },
        bests_characters: true,
      },
    })

    return CHARACTER
  } catch (error) {
    return null
  }
}
