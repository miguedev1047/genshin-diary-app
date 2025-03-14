'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteTeamCharacter(id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.teamsCharacter.delete({ where: { id } })

    return { status: 201, message: 'Equipo eliminado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
