'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function deleteCharacterTier(id: string) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos!' }
  }

  try {
    await db.tierCharacter.delete({
      where: { id },
    })

    return { status: 201, message: 'Personaje eliminado!' }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error!' }
  }
}

export async function deleteTierlist(id: string) {
  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos!' }
  }

  try {
    await db.tierList.delete({
      where: { id },
    })

    return { status: 201, message: 'Tierlist eliminada!' }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error!' }
  }
}
