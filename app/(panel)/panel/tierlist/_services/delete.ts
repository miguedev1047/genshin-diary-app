'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteCharacterTier(id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.tierCharacter.delete({
      where: { id },
    })

    return { status: 201, message: 'Personaje eliminado!' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error!' }
  }
}

export async function deleteTierlist(id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.tierList.delete({
      where: { id },
    })

    return { status: 201, message: 'Tierlist eliminada!' }
  } catch {
    return { status: 500, message: 'Ha ocurrido un error!' }
  }
}
