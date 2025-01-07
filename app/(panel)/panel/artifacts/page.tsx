import { Suspense } from 'react'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { ArtifactRoutes } from '@/app/(panel)/panel/artifacts/_components/artifact-routes'
import { ArtifactSkeleton } from '@/app/(panel)/panel/artifacts/_components/artifact-skeleton'
import { PageProps } from '@/app/(panel)/panel/artifacts/_types'
import { HeaderWrapper } from '@/components/header-wrapper'
import { ArtifactHeader } from '@/components/headers/artifact-header'

export default function PanelArtifactsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name

  return (
    <ContentLayout title='Artefactos'>
      <HeaderWrapper>
        <ArtifactHeader isCreator />
      </HeaderWrapper>

      <Suspense
        key={KEY}
        fallback={<ArtifactSkeleton />}
      >
        <ArtifactRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
