import { currentRole } from '@/data/auth'
import { db } from '@/lib/db'

type Props = {
  name: string
}

export async function getArtifacts(props: Props) {
  const { name } = props

  const ROLE = await currentRole()
  if (ROLE === 'USER') return null

  try {
    if (name) {
      const ARTIFACTS = await db.artifacts.findMany({
        orderBy: [{ name: 'asc' }, { date_created: 'desc' }],
      })

      const FILTERED_ARTIFACTS = ARTIFACTS.filter((a) =>
        a.name.toLowerCase().includes(name.toLowerCase())
      )

      return FILTERED_ARTIFACTS
    }

    const ARTIFACTS = await db.artifacts.findMany({
      orderBy: [{ name: 'asc' }, { date_created: 'desc' }],
    })

    return ARTIFACTS
  } catch (error) {
    return null
  }
}
