import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { formattedName } from '@/features/utils/formatted-names'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { PageProps } from '@/editor/weapon/[name]/_shared/types'
import { fetchWeapon } from '@/editor/weapon/[name]/_shared/_services/fetch'
import { WeaponInfo } from '@/editor/weapon/[name]/weapon-info'
import { BestCharacters } from '@/editor/weapon/[name]/best-characters'
import { WeaponProvider } from '@/editor/weapon/[name]/provider'
import Link from 'next/link'

export default async function EditorWeaponPage({ params }: PageProps) {
  const WEAPON_NAME = formattedName(params.name)
  const WEAPON = await fetchWeapon(WEAPON_NAME)

  return (
    <ContentLayout
      title='Editar arma'
      className='space-y-6'
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/weapons'>Armas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar arma</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <WeaponProvider data={WEAPON}>
        <section className='space-y-6'>
          <WeaponInfo />
          <BestCharacters />
        </section>
      </WeaponProvider>
    </ContentLayout>
  )
}
