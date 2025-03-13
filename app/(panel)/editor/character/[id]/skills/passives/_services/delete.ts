'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function deletePassive(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.passivesCharacter.delete({ where: { id } })

    return { status: 201, message: 'Pasiva eliminada.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
