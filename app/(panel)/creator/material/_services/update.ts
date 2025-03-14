'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

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

  const { name, description, image_url, rarity, type } = VALIDATE_FIELDS.data

  try {
    await db.materials.update({
      where: { id: material_id },
      data: {
        name,
        description,
        image_url,
        rarity,
        type,
      },
    })

    revalidatePath('/materials')
    return { status: 201, message: 'Cambios guardados.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
