'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function deleteTeamCharacter(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.teamsCharacter.delete({ where: { id } })

    return { status: 201, message: 'Equipo eliminado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
