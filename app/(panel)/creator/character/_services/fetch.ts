import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function getCharacter(name: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const CHARACTER = await db.characters.findFirst({
      where: { name },
    })

    return CHARACTER
  } catch {
    return null
  }
}
