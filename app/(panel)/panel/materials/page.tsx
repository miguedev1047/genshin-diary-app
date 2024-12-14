import { Suspense } from 'react'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { FilterContainer } from '@/components/filter-container'
import { MaterialFilter } from '@/app/(panel)/_components/filters/material-filter'
import { MaterialRoutes } from '@/app/(panel)/panel/materials/_components/material-routes'
import { MaterialSkeleton } from '@/app/(panel)/panel/materials/_components/material-skeleton'
import { PageProps } from '@/app/(panel)/panel/materials/_types'

export default function PanelMaterialsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.type

  return (
    <ContentLayout title='Materiales'>
      <FilterContainer>
        <MaterialFilter />
      </FilterContainer>

      <Suspense
        key={KEY}
        fallback={<MaterialSkeleton />}
      >
        <MaterialRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
