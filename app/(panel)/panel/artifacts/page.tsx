import { Suspense } from 'react'
import { FilterContainer } from '@/components/filter-container'
import { ArtifactFilter } from '@/app/(panel)/_components/filters/artifact-filter'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { ArtifactRoutes } from '@/app/(panel)/panel/artifacts/_components/artifact-routes'
import { ArtifactSkeleton } from '@/app/(panel)/panel/artifacts/_components/artifact-skeleton'
import { PageProps } from '@/app/(panel)/panel/artifacts/_types'

export default function PanelArtifactsPage(props: PageProps) {
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
