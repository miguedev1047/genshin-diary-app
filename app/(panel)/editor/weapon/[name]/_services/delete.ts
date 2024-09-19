'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function deleteCharacter(character_id: string) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponBestCharacters.delete({
      where: { id: character_id },
    })

    return { status: 201, message: 'Personaje eliminado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function deleteAscension(ascension_id: string) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponAscensions.delete({
      where: { id: ascension_id },
    })

    return { status: 201, message: 'Ascensión eliminada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
