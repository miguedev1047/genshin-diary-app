import { Suspense } from 'react'
import { WeaponRoutes } from '@/app/(panel)/panel/weapons/_components/weapon-routes'
import { WeaponSkeleton } from '@/app/(panel)/panel/weapons/_components/weapon-skeleton'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { PageProps } from '@/app/(panel)/panel/weapons/_types'
import { HeaderWrapper } from '@/components/header-wrapper'
import { WeaponHeader } from '@/components/headers/weapon-header'

export default function PanelWeaponsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.weapon + PARAMS.stars

  return (
    <ContentLayout title='Armas'>
      <HeaderWrapper>
        <WeaponHeader isCreator />
      </HeaderWrapper>

      <Suspense
        key={KEY}
        fallback={<WeaponSkeleton />}
      >
        <WeaponRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
