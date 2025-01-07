import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'
import { Team } from '@prisma/client'

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
  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    const TEAMS = await db.team.findMany({
      include: {
        characters: {
          orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
        },
      },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })

    const FILTERED_TEAMS = filterTeams(TEAMS, { ...props })
    return FILTERED_TEAMS

  } catch (error) {
    return null
  }
}
