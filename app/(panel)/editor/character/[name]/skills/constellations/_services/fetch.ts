'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function getConstellation(id: string) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return null
  }

  try {
    const CONSTELLATION = await db.constellationsCharacter.findUnique({
      where: {
        id,
      },
    })

    return CONSTELLATION
  } catch (error) {
    return null
  }
}
