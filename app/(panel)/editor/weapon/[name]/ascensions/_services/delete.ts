'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function deleteWeaponAscension(id: string) {
  if (!id) return { status: 403, message: 'Esta ascensión no existe.' }

  const ROLE = await currentRole()
  if (ROLE === 'USER') return { status: 403, message: 'No tienes permisos.' }

  try {
    await db.weaponAscensions.delete({
      where: { id },
    })

    return { status: 201, message: 'Ascensión eliminada.' }
  } catch (error) {
    return { status: 403, message: 'Ocurrio un error.' }
  }
}
