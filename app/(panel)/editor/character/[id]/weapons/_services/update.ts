'use server'

import { db } from '@/lib/db'
import { currentRole } from '@/data/auth'
import { WeaponCharacter } from '@prisma/client'

export async function updateWeapons(data: Array<WeaponCharacter>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const ITEMS = data.map((weapon, index) => ({
    ...weapon,
    order: index++ + 1,
  }))

  try {
    ITEMS.forEach(async (weapon) => {
      await db.weaponCharacter.update({
        where: {
          id: weapon.id,
        },
        data: {
          order: weapon.order,
        },
      })
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
