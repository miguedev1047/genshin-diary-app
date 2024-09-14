import { GRID_LIST } from '@/consts/classes'
import { getArtifacts } from '@/app/(panel)/panel/artifacts/_services/fetch'
import { ArtifactItem } from '@/app/(panel)/panel/artifacts/_components/artifact-item'

export async function ArtifactRoutes(props: ArtifactRoutesProps) {
  const { params: PARAMS } = props
  const ARTIFACTS = await getArtifacts(PARAMS)

  return (
    <ul className={GRID_LIST}>
      {ARTIFACTS?.map((item) => (
        <li key={item.id}>
          <ArtifactItem {...item} />
        </li>
      ))}
    </ul>
  )
}
