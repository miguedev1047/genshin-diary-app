'use server'

import { z } from 'zod'
import { ArtifactSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import { RarityEnum } from '@prisma/client'
import db from '@/lib/db'

export async function createArtifact(data: z.infer<typeof ArtifactSchema>) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = ArtifactSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, bonus_description, image_url, rarity } = VALIDATE_FIELDS.data

  try {
    await db.artifacts.create({
      data: {
        name,
        image_url,
        bonus_description,
        rarity: rarity as RarityEnum,
      },
    })

    return { status: 201, message: 'Artefacto creado.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
