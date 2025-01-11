import { db } from '@/lib/db'
import { Artifacts } from '@prisma/client'

type Props = {
  name: string
}

function filterArtifacts(artifacts: Array<Artifacts>, filters: Props) {
  const { name } = filters

  return artifacts.filter((a) => {
    const matches = [
      name ? a.name.toLowerCase().includes(name.toLowerCase()) : true,
    ]

    return matches.every(Boolean)
  })
}

export async function getArtifacts(props: Props) {
  try {
    const ARTIFACTS = await db.artifacts.findMany({
      orderBy: [{ rarity: 'desc' }, { name: 'asc' }, { date_created: 'desc' }],
    })

    const FILTERED_ARTIFACTS = filterArtifacts(ARTIFACTS, { ...props })
    return FILTERED_ARTIFACTS
  } catch (error) {
    return null
  }
}
