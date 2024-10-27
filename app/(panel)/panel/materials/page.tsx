import { Suspense } from 'react'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { FilterContainer } from '@/shared/components/filter-container'
import { MaterialFilter } from '@/shared/filters/material-filter'
import { MaterialRoutes } from '@/app/(panel)/panel/materials/_components/material-routes'
import { MaterialSkeleton } from '@/app/(panel)/panel/materials/_components/material-skeleton'

type Props = {
  searchParams: {
    name: string
    type: string
  }
}

export default function PanelMaterialsPage(props: Props) {
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
