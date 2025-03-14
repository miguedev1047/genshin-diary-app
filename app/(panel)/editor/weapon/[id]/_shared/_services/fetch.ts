import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function fetchWeapon(id: string) {
  if (await isCurrentRole('USER')) return null

  const WEAPON_ID = id

  try {
    const CHARACTER = await db.weapons.findUnique({
      where: { id: WEAPON_ID },
      include: {
        ascensions: {
          orderBy: [{ order: 'asc' }],
          include: { materials: { orderBy: [{ date_created: 'asc' }] } },
        },
        bests_characters: true,
      },
    })

    return CHARACTER
  } catch {
    return null
  }
}
