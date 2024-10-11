import { Prisma } from '@prisma/client'

export type PageProps = {
  params: { name: string }
}

export type CharacterProps = Prisma.CharactersGetPayload<{
  include: {
    artifacts: true
    ascensions: true
    constellations: true
    teams: true
    images: true
    materials: true
    passives: true
    stats_priority: true
    talents: true
    video_guide: true
    weapons: true
  }
}>
