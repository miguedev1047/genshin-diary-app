import { getArtifacts } from '@/app/(panel)/panel/artifacts/_services/fetch'
import { ArtifactItem } from '@/app/(panel)/panel/artifacts/_components/artifact-item'

export async function ArtifactRoutes(props: ArtifactRoutesProps) {
  const { params: PARAMS } = props
  const ARTIFACTS = await getArtifacts(PARAMS)

  const MAPPED_ARTIFACTS = ARTIFACTS?.map((item) => (
    <li
      key={item.id}
      className='relative'
    >
      <ArtifactItem {...item} />
    </li>
  ))

  return (
    <ul className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5'>
      {MAPPED_ARTIFACTS}
    </ul>
  )
}
