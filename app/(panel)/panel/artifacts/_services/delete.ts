'use server'

import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'

export async function deleteArtifact(artifact_id: string) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.artifactCharacter.deleteMany({
      where: { id: artifact_id },
    })
    await db.artifacts.delete({
      where: { id: artifact_id },
    })

    return { status: 201, message: 'Artefacto eliminado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
