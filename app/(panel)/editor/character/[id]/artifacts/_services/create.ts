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

  const ITEMS = artifacts.map((item, index) => ({
    artifact_id: item,
    character_id,
    order: index++ + 1,
    id: crypto.randomUUID()
  }))

  try {
    await db.artifactCharacter.createMany({
      data: ITEMS,
    })

    return { status: 201, message: 'Artefactos agregados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
