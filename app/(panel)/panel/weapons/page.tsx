import { Suspense } from 'react'
import { FilterContainer } from '@/shared/components/filter-container'
import { WeaponFilter } from '@/shared/filters/weapon-filter'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { WeaponTypeEnum } from '@prisma/client'
import { WeaponRoutes } from '@/app/(panel)/panel/weapons/_components/weapon-routes'
import { WeaponSkeleton } from '@/app/(panel)/panel/weapons/_components/weapon-skeleton'

type Props = {
  searchParams: {
    name: string
    weapon: WeaponTypeEnum
    stars: any
  }
}

export default function PanelWeaponsPage(props: Props) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.weapon + PARAMS.stars

  return (
    <ContentLayout
      title='Armas'
      className='space-y-6'
    >
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
