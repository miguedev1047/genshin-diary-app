'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getCharacter(name: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const CHARACTER = await db.characters.findFirst({
      where: { name },
    })

    return CHARACTER
  } catch (error) {
    return null
  }
}
