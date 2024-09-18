'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function createCharacter(data: Array<any>) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.weaponBestCharacters.createMany({
      data,
      skipDuplicates: true,
    })

    return { status: 201, message: 'Personaje añadido.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
