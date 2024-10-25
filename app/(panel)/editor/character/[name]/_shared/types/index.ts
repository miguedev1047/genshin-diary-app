import { Prisma } from '@prisma/client'

export type PageProps = {
  params: { name: string }
}

export type CharacterProps = Prisma.CharactersGetPayload<{
  include: {
    artifacts: true
    ascensions: true
    teams: true
    images: true
    materials: true
    stats_priority: true
    talents_ascension: true
    video_guide: true
    weapons: true
    talents: true
    passives: true
    constellations: true
  }
}>
