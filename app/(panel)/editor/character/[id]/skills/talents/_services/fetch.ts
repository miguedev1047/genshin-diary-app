'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getTalent(id: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return null
  }

  try {
    const TALENT = await db.talentsCharacter.findUnique({
      where: {
        id,
      },
    })

    return TALENT
  } catch (error) {
    return null
  }
}
