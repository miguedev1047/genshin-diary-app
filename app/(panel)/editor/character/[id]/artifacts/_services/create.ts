'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { ArtifactCharacterSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createArtifacts(
  data: z.infer<typeof ArtifactCharacterSchema>,
  character_id: string | undefined
) {
  if (!character_id) {
    return { status: 403, message: 'Este personaje no existe.' }
  }

  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = ArtifactCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { artifacts } = VALIDATE_FIELDS.data

  const ARTIFACTS = artifacts.map((artifact, index) => ({
    order: index + 1,
    character_id,
    artifact_id: artifact,
  }))

  try {
    await db.artifactCharacter.create({
      data: {
        character_id,
        artifact_set: {
          createMany: { data: ARTIFACTS },
        },
      },
    })

    return { status: 201, message: 'Artefactos agregados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
