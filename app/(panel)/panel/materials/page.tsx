import { Suspense } from 'react'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { MaterialRoutes } from '@/app/(panel)/panel/materials/_components/material-routes'
import { MaterialSkeleton } from '@/app/(panel)/panel/materials/_components/material-skeleton'
import { PageProps } from '@/app/(panel)/panel/materials/_types'
import { HeaderWrapper } from '@/components/header-wrapper'
import { MaterialHeader } from '@/app/(panel)/_components/headers/material-header'

export default function PanelMaterialsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.type

  return (
    <ContentLayout title='Materiales'>
      <HeaderWrapper>
        <MaterialHeader />
      </HeaderWrapper>

      <Suspense
        key={KEY}
        fallback={<MaterialSkeleton />}
      >
        <MaterialRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
