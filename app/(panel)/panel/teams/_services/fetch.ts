import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

type GetTeamProps = {
  name: string
}

export async function getTeams(props: GetTeamProps) {
  const { name } = props

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    if (name) {
      const TEAMS = await db.team.findMany({
        include: {
          characters: {
            orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
          },
        },
        orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
      })

      const FILTERED_TEAMS = TEAMS.filter((t) =>
        t.name.toLowerCase().includes(name.toLowerCase())
      )

      return FILTERED_TEAMS
    }

    const TEAMS = await db.team.findMany({
      include: {
        characters: {
          orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
        },
      },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })

    return TEAMS
  } catch (error) {
    return null
  }
}
