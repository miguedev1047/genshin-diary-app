'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'

export async function updateMaterial(
  data: z.infer<typeof MaterialSchema>,
  material_id: string
) {
  if (await isCurrentRole('USER')) {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = MaterialSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, description, type, image_url, rarity } = VALIDATE_FIELDS.data

  try {
    await db.materials.update({
      where: { id: material_id },
      data: {
        name,
        description,
        type,
        image_url,
        rarity,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
