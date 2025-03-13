import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function fetchWeapon(id: string) {
  const WEAPON_ID = id

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

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
