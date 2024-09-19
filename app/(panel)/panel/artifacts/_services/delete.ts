'use server'

import { currentRole } from '@/data/auth'
import db from '@/lib/db'

export async function deleteArtifact(artifact_id: string) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  try {
    await db.artifacts.delete({
      where: { id: artifact_id },
    })

    return { status: 201, message: 'Artefacto eliminado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
