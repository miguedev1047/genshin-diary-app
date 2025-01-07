import { db } from '@/lib/db'

export async function getWeapon(id: string) {
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
  } catch (error) {
    return null
  }
}
