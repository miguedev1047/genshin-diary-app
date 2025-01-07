import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { PageProps } from '@/app/(panel)/editor/weapon/[id]/_shared/types'
import { fetchWeapon } from '@/app/(panel)/editor/weapon/[id]/_shared/_services/fetch'
import { WeaponInfo } from '@/app/(panel)/editor/weapon/[id]/weapon-info'
import { BestCharacters } from '@/app/(panel)/editor/weapon/[id]/best-characters'
import { WeaponProvider } from '@/app/(panel)/editor/weapon/[id]/provider'
import { Ascensions } from '@/app/(panel)/editor/weapon/[id]/ascensions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function EditorWeaponPage(props: PageProps) {
  const { params } = props

  const WEAPON_ID = params.id
  const WEAPON = await fetchWeapon(WEAPON_ID)

  if (!WEAPON) return redirect('/panel/weapons')

  return (
    <ContentLayout title='Editar arma'>
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
          <Ascensions />
        </section>
      </WeaponProvider>
    </ContentLayout>
  )
}
