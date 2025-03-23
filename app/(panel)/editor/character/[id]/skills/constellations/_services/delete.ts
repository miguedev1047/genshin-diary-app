'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteConstellation(id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.constellationsCharacter.delete({ where: { id } })

    return { status: 201, message: 'Constelación eliminada.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
