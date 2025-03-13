import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

export async function getArtifact(name: string) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
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
