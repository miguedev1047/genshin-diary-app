'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function deleteCharacter(id: string) {
  if (!id) return { status: 403, message: 'Este personaje no existe.' }

  const ROLE = await currentRole()
  if (ROLE === 'USER') return { status: 403, message: 'No tienes permisos.' }

  try {
    await db.weaponBestCharacters.delete({
      where: { id },
    })

    return { status: 201, message: 'Personaje eliminado.' }
  } catch (error) {
    return { status: 403, message: 'Ocurrio un error.' }
  }
}
