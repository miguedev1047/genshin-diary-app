import { currentRole } from '@/data/auth'
import { Prisma } from '@prisma/client'
import db from '@/lib/db'

type Teams = Array<
  Prisma.TeamGetPayload<{
    include: { characters: true }
  }>
>

type GetTeamProps = {
  name: string
}

export async function getTeams(props: GetTeamProps) {
  const { name } = props

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return { status: 401, message: 'No tienes permisos.' }
  }

  try {
    const TEAMS = await db.team.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        characters: {
          orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
        },
      },
      orderBy: [{ order: 'asc' }, { date_created: 'desc' }],
    })

    return TEAMS as Teams
  } catch (error) {
    return null
  }
}
