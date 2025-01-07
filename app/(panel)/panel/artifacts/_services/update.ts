'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { ArtifactSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateArtifact(
  data: z.infer<typeof ArtifactSchema>,
  artifact_id: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = ArtifactSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, bonus_description, image_url, rarity } = VALIDATE_FIELDS.data

  try {
    await db.artifacts.update({
      where: { id: artifact_id },
      data: {
        name,
        bonus_description,
        image_url,
        rarity,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
