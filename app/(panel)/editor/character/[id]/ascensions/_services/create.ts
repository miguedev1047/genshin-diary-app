'use server'

import { z } from 'zod'
import { ASCENSION_CHARACTER } from '@/consts/general'
import { currentRole } from '@/data/auth'
import { AscensionSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createAscension(
  data: z.infer<typeof AscensionSchema>,
  character_id: string | undefined
) {
  if (!character_id) return { status: 403, message: 'El personaje no existe.' }

  const ROLE = await currentRole()
  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = AscensionSchema.safeParse(data)
  
  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { ascension_level, materials } = VALIDATE_FIELDS.data

  const SELECTED_ASCENSION = ASCENSION_CHARACTER.find(
    (item) => item.ascension === ascension_level
  )!

  const MATERIALS = materials.map((material) => ({
    character_id,
    material_id: material,
  }))

  try {
    await db.ascensionCharacter.create({
      data: {
        character_id,
        ascension_level: SELECTED_ASCENSION?.ascension,
        order: SELECTED_ASCENSION?.order,
        cost: SELECTED_ASCENSION?.cost,
        level: SELECTED_ASCENSION?.level,
        materials: {
          createMany: { data: MATERIALS },
        },
      },
    })

    return { status: 201, message: 'Ascension añadida.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
