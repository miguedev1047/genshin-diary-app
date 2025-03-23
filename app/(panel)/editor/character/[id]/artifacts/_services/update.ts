'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { ArtifactCharacter } from '@prisma/client'
import { ArtifactCharacterSchema } from '@/schemas'

export async function updateArtifactsOrder(data: Array<ArtifactCharacter>) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((item, index) => ({
    ...item,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (item) => {
      return await db.artifactCharacter.update({
        where: {
          id: item.id,
        },
        data: {
          order: item.order,
        },
      })
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}

export async function updateArtifacts(
  data: z.infer<typeof ArtifactCharacterSchema>,
  character_id: string | undefined,
  artifact_set_id: string
) {
  if (!character_id) {
    return { status: 403, message: 'Este personaje no existe.' }
  }

  if (await isCurrentRole('USER')) {
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
    artifact_set_id,
    artifact_id: artifact,
  }))

  try {
    await db.artifactCharacterSet.deleteMany({
      where: { artifact_set_id },
    })

    await db.artifactCharacterSet.createMany({
      data: ARTIFACTS,
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
