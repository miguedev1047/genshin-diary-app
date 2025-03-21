import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { redirect } from 'next/navigation'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { PageProps } from '@/app/(panel)/editor/weapon/[id]/_shared/types'
import { fetchWeapon } from '@/app/(panel)/editor/weapon/[id]/_shared/_services/fetch'
import { WeaponInfo } from '@/app/(panel)/editor/weapon/[id]/weapon-info'
import { BestCharacters } from '@/app/(panel)/editor/weapon/[id]/best-characters'
import { Ascensions } from '@/app/(panel)/editor/weapon/[id]/ascensions'
import { WeaponProvider } from '@/features/providers/weapon-provider'
import { AlertStatus } from '@/app/(panel)/editor/weapon/[id]/alert-status'
import { Button } from '@/components/ui/button'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

export default async function EditorWeaponPage(props: PageProps) {
  const { params } = props

  const WEAPON_ID = params.id
  const WEAPON = await fetchWeapon(WEAPON_ID)

  if (!WEAPON) return redirect('/panel/weapons')

  return (
    <ContentLayout title='Editar arma'>
      <article className='flex items-center justify-between'>
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

        {WEAPON.is_public && (
          <Button
            variant='link'
            asChild
          >
            <Link
              href={`/weapon/${WEAPON.id}`}
              target='_blank'
              className='flex items-center gap-3'
            >
              <LinkIcon /> <span>Ver arma</span>
            </Link>
          </Button>
        )}
      </article>

      <WeaponProvider data={WEAPON}>
        <section className='space-y-6'>
          <AlertStatus />
          <WeaponInfo />
          <BestCharacters />
          <Ascensions />
        </section>
      </WeaponProvider>
    </ContentLayout>
  )
}
