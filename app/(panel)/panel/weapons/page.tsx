import { Suspense } from 'react'
import { WeaponRoutes } from '@/app/(panel)/panel/weapons/_components/weapon-routes'
import { WeaponSkeleton } from '@/app/(panel)/panel/weapons/_components/weapon-skeleton'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { FilterContainer } from '@/components/filter-container'
import { WeaponFilter } from '@/app/(panel)/_components/filters/weapon-filter'
import { PageProps } from '@/app/(panel)/panel/weapons/_types'

export default function PanelWeaponsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.weapon + PARAMS.stars

  return (
    <ContentLayout title='Armas'>
      <FilterContainer>
        <WeaponFilter />
      </FilterContainer>

      <Suspense
        key={KEY}
        fallback={<WeaponSkeleton />}
      >
        <WeaponRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
