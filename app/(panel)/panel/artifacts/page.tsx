import { GRID_LIST } from '@/consts/classes'
import { FilterContainer } from '@/shared/components/filter-container'
import { ArtifactFilter } from '@/shared/filters/artifact-filter'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { getArtifacts } from '@/app/(panel)/panel/artifacts/_services/fetch'
import { ArtifactItem } from '@/app/(panel)/panel/artifacts/_components/artifact-item'

type Props = {
  searchParams: {
    name: string
  }
}

export default async function PanelArtifactsPage(props: Props) {
  const { searchParams: PARAMS } = props
  const ARTIFACTS = await getArtifacts(PARAMS)

  const ITEMS = ARTIFACTS?.map((item) => (
    <li key={item.id}>
      <ArtifactItem {...item} />
    </li>
  ))

  return (
    <ContentLayout
      title='Artefactos'
      className='space-y-6'
    >
      <FilterContainer>
        <ArtifactFilter />
      </FilterContainer>

      <ul className={GRID_LIST}>{ITEMS}</ul>
    </ContentLayout>
  )
}
