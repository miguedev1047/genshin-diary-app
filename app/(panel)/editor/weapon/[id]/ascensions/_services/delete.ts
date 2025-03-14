'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteWeaponAscension(id: string) {
  if (!id) return { status: 403, message: 'Esta ascensión no existe.' }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponAscensions.delete({
      where: { id },
    })

    return { status: 201, message: 'Ascensión eliminada.' }
  } catch {
    return { status: 403, message: 'Ocurrio un error.' }
  }
}
