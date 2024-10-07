'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { StatsPrioritySchema } from '@/schemas'
import db from '@/lib/db'

export async function updateStats(
  data: z.infer<typeof StatsPrioritySchema>,
  id: string | undefined
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = StatsPrioritySchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos inválidos.' }
  }

  const { circlet_stat, globet_stat, sand_stat, order_priority } =
    VALIDATE_FIELDS.data

  try {
    await db.statsPriorityCharacter.update({
      where: { id },
      data: {
        circlet_stat,
        globet_stat,
        sand_stat,
        order_priority,
      },
    })

    return { status: 201, message: 'Cambios guardados.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
