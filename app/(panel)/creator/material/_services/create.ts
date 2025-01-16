'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getMaterial } from '@/app/(panel)/creator/material/_services/fetch'
import { revalidatePath } from 'next/cache'

export async function createMaterial(data: z.infer<typeof MaterialSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = MaterialSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 400, message: 'Campos invalidos.' }
  }

  const { name, description, image_url, rarity, type } = VALIDATE_FIELDS.data

  const MATERIAL = await getMaterial(name)

  if (MATERIAL) {
    return { status: 403, message: 'Ese material ya existe!' }
  }

  try {
    await db.materials.create({
      data: {
        name,
        description,
        image_url,
        rarity,
        type,
      },
    })

    revalidatePath('/materials')
    return { status: 201, message: 'Material creado.' }
  } catch (error) {
    console.log(error)
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
