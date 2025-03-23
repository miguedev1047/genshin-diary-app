import { Prisma } from '@prisma/client'

export type PageProps = {
  params: { id: string }
}

export type CharacterProps = Prisma.CharactersGetPayload<{
  include: {
    artifacts: true
    ascensions: true
    double_artifact_character: { include: { double_artifact: true } }
    teams: true
    images: true
    stats_priority: true
    talents_ascension: true
    video_guide: true
    weapons: true
    talents: true
    passives: true
    constellations: true
  }
}>
