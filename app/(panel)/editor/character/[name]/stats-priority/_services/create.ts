'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { StatsPrioritySchema } from '@/schemas'
import db from '@/lib/db'

export async function createStats(data: z.infer<typeof StatsPrioritySchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = StatsPrioritySchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { character_id, circlet_stat, globet_stat, order_priority, sand_stat } =
    VALIDATE_FIELDS.data

  try {
    await db.statsPriorityCharacter.create({
      data: {
        character_id,
        circlet_stat,
        globet_stat,
        sand_stat,
        order_priority,
      },
    })

    return { status: 201, message: 'Estadisticas agregadas.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
