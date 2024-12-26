'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { VideoGuideSchema } from '@/schemas'
import { db } from '@/lib/db'

export async function createVideoGuide(data: z.infer<typeof VideoGuideSchema>) {
  const ROLE = await currentRole()

  if (ROLE === 'USER') {
    return { status: 403, message: 'No tienes permisos.' }
  }

  const VALIDATE_FIELDS = VideoGuideSchema.safeParse(data)

  if (!VALIDATE_FIELDS.success) {
    return { status: 403, message: 'Campos invalidos.' }
  }

  const { character_id, embed_video_url, youtuber_channel, youtuber_name } =
    VALIDATE_FIELDS.data

  try {
    await db.videoGuideCharacter.create({
      data: {
        character_id,
        embed_video_url,
        youtuber_channel,
        youtuber_name,
      },
    })

    return { status: 201, message: 'Video guia agregada.' }
  } catch (error) {
    return { status: 500, message: 'Ocurrio un error.' }
  }
}
