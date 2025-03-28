'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { ArtifactSchema } from '@/schemas'
import { isCurrentRole } from '@/data/auth'
import { getArtifact } from '@/app/(panel)/creator/artifact/_services/fetch'
import { revalidatePath } from 'next/cache'

export async function createArtifact(data: z.infer<typeof ArtifactSchema>) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = ArtifactSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, bonus_description, image_url, rarity } = VALIDATE_FIELDS.data

  const ARTIFACT = await getArtifact(name)

  if (ARTIFACT) {
    return { status: 403, message: 'Este artefacto ya existe.' }
  }

  try {
    await db.artifacts.create({
      data: {
        name,
        image_url,
        bonus_description,
        rarity,
      },
    })

    revalidatePath('/artifacts')
    return { status: 201, message: 'Artefacto creado.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
