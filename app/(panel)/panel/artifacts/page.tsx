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

export default function PanelArtifactsPage(props: Props) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name

  return (
    <ContentLayout title='Artefactos'>
      <FilterContainer>
        <ArtifactFilter />
      </FilterContainer>

      <Suspense
        key={KEY}
        fallback={<ArtifactSkeleton />}
      >
        <ArtifactRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
