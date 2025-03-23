import { ArtifactRoutesProps } from '@/app/(panel)/panel/artifacts/_components/artifact-routes/artifact-route.type'
import { getArtifacts } from '@/app/(panel)/panel/artifacts/_services/fetch'
import { ArtifactItem } from '@/app/(panel)/panel/artifacts/_components/artifact-item'
import { EMPTY_LIST } from '@/consts/misc'
import { EmptyList } from '@/components/empty-list'
import { ITEMS_GRID_LIST } from '@/consts/classes'

export async function ArtifactRoutes(props: ArtifactRoutesProps) {
  const { params: PARAMS } = props
  const ARTIFACTS = await getArtifacts(PARAMS)

  if (!ARTIFACTS || ARTIFACTS.length === EMPTY_LIST) {
    return <EmptyList text='No hay armas disponibles' />
  }

  const MAPPED_ARTIFACTS = ARTIFACTS?.map((item) => (
    <li
      key={item.id}
      className='relative'
    >
      <ArtifactItem {...item} />
    </li>
  ))

  return <ul className={ITEMS_GRID_LIST}>{MAPPED_ARTIFACTS}</ul>
}
