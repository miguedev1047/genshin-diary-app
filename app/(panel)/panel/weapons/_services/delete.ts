'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteWeapon(weapon_id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponCharacter.deleteMany({
      where: { id: weapon_id },
    })
    await db.weapons.delete({
      where: { id: weapon_id },
    })

    return { status: 201, message: 'Arma eliminada.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
