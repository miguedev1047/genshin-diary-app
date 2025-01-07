'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TierlistSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function updateTierlist(
  data: z.infer<typeof TierlistSchema>,
  tierlist_id: string
) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 401, message: 'No tienes permisos!' }
  }

  const VALIDATE_FIELDS = TierlistSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 401, message: 'Campos invalidos!' }
  }

  const { tier_category } = VALIDATE_FIELDS.data

  try {
    await db.tierList.update({
      where: {
        id: tierlist_id,
      },
      data: {
        tier_category,
      },
    })

    return { status: 201, message: 'Cambios guardadops!' }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error.' }
  }
}
