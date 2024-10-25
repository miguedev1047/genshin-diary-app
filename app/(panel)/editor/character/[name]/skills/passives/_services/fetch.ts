'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function getPassive(id: string) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return null
  }

  try {
    const PASSIVE = await db.passivesCharacter.findUnique({
      where: {
        id,
      },
    })

    return PASSIVE
  } catch (error) {
    return null
  }
}
