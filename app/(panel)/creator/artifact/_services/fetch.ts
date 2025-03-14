import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function getArtifact(name: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    const ARTIFACT = await db.artifacts.findFirst({
      where: { name },
    })

    return ARTIFACT
  } catch {
    return null
  }
}
