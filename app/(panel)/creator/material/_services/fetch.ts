import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function getMaterial(name: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const MATERIAL = await db.materials.findFirst({
      where: { name },
    })

    return MATERIAL
  } catch {
    return null
  }
}
