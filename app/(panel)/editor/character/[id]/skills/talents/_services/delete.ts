'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteTalent(id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.talentsCharacter.delete({ where: { id } })

    return { status: 201, message: 'Talento eliminado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
