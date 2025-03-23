import { db } from '@/lib/db'
import { Prisma, Team } from '@prisma/client'

type Props = {
  name: string
}

function filterTeams(
  teams: Array<Prisma.TeamGetPayload<{ include: { characters: true } }>>,
  filters: Props
) {
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

    return FILTERED_TEAMS
  } catch {
    return null
  }
}
