import { Suspense } from 'react'
import { FilterContainer } from '@/shared/components/filter-container'
import { ArtifactFilter } from '@/shared/filters/artifact-filter'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { ArtifactRoutes } from '@/app/(panel)/panel/artifacts/_components/artifact-routes'
import { ArtifactSkeleton } from '@/app/(panel)/panel/artifacts/_components/artifact-skeleton'

type Props = {
  searchParams: {
    name: string
  }
}

export default async function PanelArtifactsPage(props: Props) {
  const { searchParams: PARAMS } = props

  return (
    <ContentLayout
      title='Artefactos'
      className='space-y-6'
    >
      <FilterContainer>
        <ArtifactFilter />
      </FilterContainer>

      <Suspense fallback={<ArtifactSkeleton />}>
        <ArtifactRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
