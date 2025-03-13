'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponCharacterSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createWeapons(
  data: z.infer<typeof WeaponCharacterSchema>,
  character_id: string | undefined
) {
  if (!character_id) {
    return { status: 403, message: 'Este personaje no existe.' }
  }

  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = WeaponCharacterSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { weapons } = VALIDATE_FIELDS.data

  const ITEMS = weapons.map((weapon, index) => ({
    weapon_id: weapon,
    character_id,
    order: index++ + 1,
    id: crypto.randomUUID()
  }))

  try {
    await db.weaponCharacter.createMany({
      data: ITEMS,
    })

    return { status: 201, message: 'Armas agregadas.' }
  } catch {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
