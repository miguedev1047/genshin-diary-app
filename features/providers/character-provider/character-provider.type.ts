import { Prisma } from '@prisma/client'

type CharacterProps = Prisma.CharactersGetPayload<{
  include: {
    artifacts: {
      orderBy: { order: 'asc' }
      include: { artifact_set: { orderBy: { order: 'asc' } } }
    }
    ascensions: { orderBy: { level: 'asc' }; include: { materials: true } }
    images: true
    stats_priority: true
    video_guide: true
    weapons: { orderBy: { order: 'asc' } }
    teams: {
      orderBy: { order: 'asc' }
      include: { characters: { orderBy: { order: 'asc' } } }
    }
    talents_ascension: {
      orderBy: { level: 'asc' }
      include: { materials: { orderBy: [{ date_created: 'asc' }] } }
    }
    talents: { orderBy: [{ order: 'asc' }, { date_created: 'asc' }] }
    passives: { orderBy: { order: 'asc' } }
    constellations: { orderBy: { order: 'asc' } }
  }
}>

export type CharacterContextProps = {
  data: CharacterProps | null
}

export type CharacterProviderProps = {
  data: CharacterProps | null
  children: React.ReactNode
}
