'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'
import db from '@/lib/db'

export async function updateMaterial(
  data: z.infer<typeof MaterialSchema>,
  material_id: string
) {
  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
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
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
