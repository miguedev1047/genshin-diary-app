import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function getWeapon(name: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const WEAPON = await db.weapons.findFirst({
      where: { name },
    })

    return WEAPON
  } catch {
    return null
  }
}
