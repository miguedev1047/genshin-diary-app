import { currentRole } from '@/data/auth'
import db from '@/lib/db'

type Props = {
  name: string
}

export async function getArtifacts(props: Props) {
  const { name } = props

  const ROLE = await currentRole()

  if (ROLE !== 'ADMIN') {
    return null
  }

  try {
    const ARTIFACTS = await db.artifacts.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
      },
      orderBy: [{ name: 'asc' }, { date_created: 'desc' }],
    })

    return ARTIFACTS
  } catch (error) {
    return null
  }
}
