import { db } from '@/lib/db'
import { Team } from '@prisma/client'
import { TeamProps, CharacterProps } from '@/app/(index)/(routes)/teams/_types'

type Props = {
  name: string
}

function filterTeams(teams: Array<Team>, filters: Props) {
  const { name } = filters

  return teams.filter((t) => {
    const matches = [
      name ? t.name.toLowerCase().includes(name.toLowerCase()) : true,
    ]

    return matches.every(Boolean)
  })
}

export async function getTeams(props: Props) {
  try {
    const TEAMS = await db.team.findMany({
      include: { characters: true },
    })

    const FILTERED_TEAMS = filterTeams(TEAMS, { ...props })

    return FILTERED_TEAMS as TeamProps
  } catch {
    return null
  }
}

export async function getCharacterById(character_id: string) {
  try {
    const CHARACTER = await db.characters.findUnique({
      where: { id: character_id },
    })

    return CHARACTER as CharacterProps
  } catch {
    return null
  }
}
