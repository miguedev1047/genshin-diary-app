'use server'

import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getMaterial(name: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const MATERIAL = await db.materials.findFirst({
      where: { name },
    })

    return MATERIAL
  } catch (error) {
    return null
  }
}
