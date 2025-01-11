'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getWeapon(name: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const WEAPON = await db.weapons.findFirst({
      where: { name },
    })

    return WEAPON
  } catch (error) {
    return null
  }
}
