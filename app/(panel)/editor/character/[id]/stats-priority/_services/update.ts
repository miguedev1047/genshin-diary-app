'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { isCurrentRole } from '@/data/auth'
import { StatsPrioritySchema } from '@/schemas'

export async function updateStats(
  data: z.infer<typeof StatsPrioritySchema>,
  id: string | undefined
) {
  if (await isCurrentRole('USER')) {
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
  } catch {
    return { status: 500, message: 'Ocurrió un error.' }
  }
}
