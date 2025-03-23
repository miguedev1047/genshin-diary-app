'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteCharacter(id: string) {
  if (!id) return { status: 403, message: 'Este personaje no existe.' }

  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponBestCharacters.delete({
      where: { id },
    })

    return { status: 201, message: 'Personaje eliminado.' }
  } catch {
    return { status: 403, message: 'Ocurrio un error.' }
  }
}
